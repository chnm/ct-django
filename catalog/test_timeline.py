from types import SimpleNamespace

from catalog.timeline import (
    PHASE_BY_LABEL,
    PHASES,
    UNASSIGNED,
    build_timeline,
    is_approximate,
    phase_for,
)


def rec(id, start, end=None, circulation="pr", approximate=False):
    return SimpleNamespace(
        id=id,
        start=start,
        end=end,
        approximate=approximate,
        date_display=str(start),
        circulation=circulation,
    )


def test_phase_lookup():
    assert phase_for("td").label == "Trade & Distribution"
    assert phase_for(None) is UNASSIGNED
    assert phase_for("zz") is UNASSIGNED
    assert list(PHASES) == ["pr", "td", "co"]
    assert PHASE_BY_LABEL["Consumption"] == "co"


def test_is_approximate():
    def item(precision, certainty="stated"):
        return SimpleNamespace(date_precision=precision, date_certainty=certainty)

    assert not is_approximate(item("year"))
    assert is_approximate(item("year", "inferred"))
    for precision in ["circa", "range", "circa_range", "decade", "century", None]:
        assert is_approximate(item(precision))


def test_exact_and_approximate_bars():
    t = build_timeline([rec(1, 1748), rec(2, 1855, 1879, "td", approximate=True)])
    prod, trade = t.lanes[0], t.lanes[1]
    assert prod.code == "pr" and trade.code == "td"
    (b1,) = prod.bars
    (b2,) = trade.bars
    assert (b1.start, b1.end, b1.approximate) == (1748, 1748, False)
    assert (b2.start, b2.end, b2.approximate) == (1855, 1879, True)
    assert b2.x1 < b2.x2 and b2.xn == b2.x1
    assert t.placed == 2 and t.total == 2


def test_undated_and_unassigned_are_counted_not_drawn():
    t = build_timeline([rec(1, None), rec(2, 1800, circulation=None), rec(3, 1800)])
    assert t.undated == 1
    assert t.unassigned == 1
    assert t.placed == 1
    assert sum(len(lane.bars) for lane in t.lanes) == 1


def test_record_in_two_phases_is_drawn_twice_but_counted_once():
    t = build_timeline([rec("a", 1750, circulation="pr"), rec("a", 1750, circulation="co")])
    assert [len(lane.bars) for lane in t.lanes] == [1, 0, 1]
    assert (t.placed, t.total) == (1, 1)


def test_domain_rounds_outward_to_decades_and_is_at_least_fifty_years():
    t = build_timeline([rec(1, 1748), rec(2, 1752)])
    assert t.domain == (1725, 1775)  # 1740-1760 widened symmetrically to 50
    t = build_timeline([rec(1, 1701), rec(2, 1899)])
    assert t.domain == (1700, 1900)


def test_empty_input_has_default_domain_and_no_bars():
    t = build_timeline([])
    assert t.domain == (1700, 1900)
    assert t.placed == 0 and all(lane.bars == [] for lane in t.lanes)
    assert t.ticks[0].label == "1700" and t.ticks[-1].label == "1900"


def test_ticks_scale_with_domain():
    labels = [k.label for k in build_timeline([rec(1, 600, 699), rec(2, 2022)]).ticks]
    assert labels[0] == "600" and labels[-1] == "2030"
    assert all(
        int(v) % 100 == 0 for v in labels[1:-1]
    )  # century ticks over a wide domain
    assert "1000" in labels and len(labels) <= 20


def test_highlight_dims_others_and_sets_band():
    t = build_timeline([rec(1, 1748), rec(2, 1800, circulation="co")], highlight_id=2)
    bars = [b for lane in t.lanes for b in lane.bars]
    by_id = {b.record_id: b for b in bars}
    assert by_id[2].highlighted and not by_id[2].dimmed
    assert by_id[1].dimmed and not by_id[1].highlighted
    assert t.band == (by_id[2].x1, by_id[2].x2)
    assert t.band_width >= 3


def test_compact_reduces_height():
    full = build_timeline([rec(1, 1748)])
    compact = build_timeline([rec(1, 1748)], compact=True)
    assert compact.height < full.height
    assert compact.width < full.width
    assert compact.gutter < full.gutter


def test_bars_in_a_lane_spread_over_three_rows():
    t = build_timeline([rec(i, 1700 + i) for i in range(6)])
    ys = [b.y for b in t.lanes[0].bars]
    assert len(set(ys)) == 3


def test_end_labels_do_not_crowd_inner_ticks():
    labels = [k.label for k in build_timeline([rec(1, 1600), rec(2, 2020)]).ticks]
    assert labels == ["1600", "1700", "1800", "1900", "2020"]

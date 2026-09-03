from types import SimpleNamespace

from material.timeline import (
    PHASES,
    UNASSIGNED,
    build_timeline,
    is_exact_year,
    phase_for,
)


def rec(id, year, circulation="pr"):
    return SimpleNamespace(id=id, year=year, circulation=circulation)


def test_phase_lookup():
    assert phase_for("td").label == "Trade & Distribution"
    assert phase_for(None) is UNASSIGNED
    assert phase_for("zz") is UNASSIGNED
    assert list(PHASES) == ["pr", "td", "co"]


def test_is_exact_year():
    assert is_exact_year("1748")
    assert is_exact_year(" 1748 ")
    assert not is_exact_year("ca. 1748")
    assert not is_exact_year("1855-1879")
    assert not is_exact_year("18th century")
    assert not is_exact_year("")
    assert not is_exact_year(None)


def test_exact_and_approximate_bars():
    t = build_timeline([rec(1, "1748"), rec(2, "ca. 1855-1879", "td")])
    prod, trade = t.lanes[0], t.lanes[1]
    assert prod.code == "pr" and trade.code == "td"
    (b1,) = prod.bars
    (b2,) = trade.bars
    assert (b1.start, b1.end, b1.approximate) == (1748, 1748, False)
    assert (b2.start, b2.end, b2.approximate) == (1855, 1879, True)
    assert b2.x1 < b2.x2 and b2.xn == b2.x1
    assert t.placed == 2 and t.total == 2


def test_undated_and_unassigned_are_counted_not_drawn():
    t = build_timeline([rec(1, "unknown"), rec(2, "1800", None), rec(3, "1800")])
    assert t.undated == 1
    assert t.unassigned == 1
    assert t.placed == 1
    assert sum(len(lane.bars) for lane in t.lanes) == 1


def test_domain_rounds_outward_to_decades_and_is_at_least_fifty_years():
    t = build_timeline([rec(1, "1748"), rec(2, "1752")])
    assert t.domain == (1725, 1775)  # 1740-1760 widened symmetrically to 50
    t = build_timeline([rec(1, "1701"), rec(2, "1899")])
    assert t.domain == (1700, 1900)


def test_empty_input_has_default_domain_and_no_bars():
    t = build_timeline([])
    assert t.domain == (1700, 1900)
    assert t.placed == 0 and all(lane.bars == [] for lane in t.lanes)
    assert t.ticks[0].label == "1700" and t.ticks[-1].label == "1900"


def test_ticks_scale_with_domain():
    labels = [k.label for k in build_timeline([rec(1, "7th century"), rec(2, "2022")]).ticks]
    assert labels[0] == "600" and labels[-1] == "2030"
    assert all(int(v) % 100 == 0 for v in labels[1:-1])  # century ticks over a wide domain
    assert "1000" in labels and len(labels) <= 20


def test_highlight_dims_others_and_sets_band():
    t = build_timeline([rec(1, "1748"), rec(2, "1800", "co")], highlight_id=2)
    bars = [b for lane in t.lanes for b in lane.bars]
    by_id = {b.record_id: b for b in bars}
    assert by_id[2].highlighted and not by_id[2].dimmed
    assert by_id[1].dimmed and not by_id[1].highlighted
    assert t.band == (by_id[2].x1, by_id[2].x2)


def test_compact_reduces_height():
    full = build_timeline([rec(1, "1748")])
    compact = build_timeline([rec(1, "1748")], compact=True)
    assert compact.height < full.height
    assert compact.width < full.width
    assert compact.gutter < full.gutter


def test_bars_in_a_lane_spread_over_three_rows():
    t = build_timeline([rec(i, str(1700 + i)) for i in range(6)])
    ys = [b.y for b in t.lanes[0].bars]
    assert len(set(ys)) == 3

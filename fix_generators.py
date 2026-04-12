with open("benches/common/generators.rs", "r") as f:
    content = f.read()

# Replace the loop for the second half:
# Instead of `let val = val_a.saturating_add(...)`, we can just ensure it doesn't overflow.
# The simplest way to get a disjoint element that is larger than val_a and maintains sorting:
# The values are spread across 0..u64::MAX.
# Wait, `generate_disjoint` doesn't NEED to make `val > val_a` by a lot.
# `val = val_a.saturating_add(1)` might hit the next element `val_b`.
# Actually, the original code had `val_a + (val_a + pivot_val) / 2`.
# Let's just use `let val = val_a.wrapping_add((val_a / 2).wrapping_add(pivot_val / 2));`
# Wait, wrapping_add will break sorting!

# What if we just cap the generated values when creating the arrays?
# `generate_sorted_unique` currently does `rng.next_u64()`.
# If we change it to generate up to `u64::MAX / 4`, then it won't overflow!
# Let's check where `generate_sorted_unique` is defined.

content = content.replace("rng.next_u64()", "(rng.next_u64() >> 2)")

with open("benches/common/generators.rs", "w") as f:
    f.write(content)

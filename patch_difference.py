with open("src/difference.rs", "r") as f:
    content = f.read()

content = content.replace("use std::{cmp::Ordering, simd::cmp::SimdPartialOrd};", "use std::simd::cmp::SimdPartialOrd;")

old_block1 = """            match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    // a[i] is not in b (at least not at current position)
                    count += 1;
                    i += 1;
                }
                Ordering::Greater => {
                    // Haven't reached a[i] in b yet
                    j += 1;
                }
                Ordering::Equal => {
                    // a[i] is in b, skip ALL duplicates of this value in both arrays
                    let matched_val = a[i];
                    while i < a.len() && a[i] == matched_val {
                        i += 1;
                    }
                    while j < b.len() && b[j] == matched_val {
                        j += 1;
                    }
                }
            }"""

new_block1 = """            // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
            if a[i] < b[j] {
                // a[i] is not in b (at least not at current position)
                count += 1;
                i += 1;
            } else if a[i] > b[j] {
                // Haven't reached a[i] in b yet
                j += 1;
            } else {
                // a[i] is in b, skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }"""
content = content.replace(old_block1, new_block1)

old_block2 = """        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                count += 1;
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                // Skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }
        }"""

new_block2 = """        // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
        if a[i] < b[j] {
            count += 1;
            i += 1;
        } else if a[i] > b[j] {
            j += 1;
        } else {
            // Skip ALL duplicates of this value in both arrays
            let matched_val = a[i];
            while i < a.len() && a[i] == matched_val {
                i += 1;
            }
            while j < b.len() && b[j] == matched_val {
                j += 1;
            }
        }"""
content = content.replace(old_block2, new_block2)

old_block3 = """            match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    // a[i] is not in b, include it
                    dest[write] = a[i];
                    write += 1;
                    i += 1;
                }
                Ordering::Greater => {
                    // Haven't reached a[i] in b yet
                    j += 1;
                }
                Ordering::Equal => {
                    // a[i] is in b, skip ALL duplicates of this value in both arrays
                    let matched_val = a[i];
                    while i < a.len() && a[i] == matched_val {
                        i += 1;
                    }
                    while j < b.len() && b[j] == matched_val {
                        j += 1;
                    }
                }
            }"""

new_block3 = """            // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
            if a[i] < b[j] {
                // a[i] is not in b, include it
                dest[write] = a[i];
                write += 1;
                i += 1;
            } else if a[i] > b[j] {
                // Haven't reached a[i] in b yet
                j += 1;
            } else {
                // a[i] is in b, skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }"""
content = content.replace(old_block3, new_block3)

old_block4 = """        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                dest[write] = a[i];
                write += 1;
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                // Skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }
        }"""

new_block4 = """        // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
        if a[i] < b[j] {
            dest[write] = a[i];
            write += 1;
            i += 1;
        } else if a[i] > b[j] {
            j += 1;
        } else {
            // Skip ALL duplicates of this value in both arrays
            let matched_val = a[i];
            while i < a.len() && a[i] == matched_val {
                i += 1;
            }
            while j < b.len() && b[j] == matched_val {
                j += 1;
            }
        }"""
content = content.replace(old_block4, new_block4)

old_block5 = """                match a_data[i].cmp(&b_data[j]) {
                    Ordering::Less => {
                        expected += 1;
                        i += 1;
                    }
                    Ordering::Greater => {
                        j += 1;
                    }
                    Ordering::Equal => {
                        // Skip ALL duplicates of matched value in both arrays
                        let matched_val = a_data[i];
                        while i < a_data.len() && a_data[i] == matched_val {
                            i += 1;
                        }
                        while j < b_data.len() && b_data[j] == matched_val {
                            j += 1;
                        }
                    }
                }"""

new_block5 = """                // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
                if a_data[i] < b_data[j] {
                    expected += 1;
                    i += 1;
                } else if a_data[i] > b_data[j] {
                    j += 1;
                } else {
                    // Skip ALL duplicates of matched value in both arrays
                    let matched_val = a_data[i];
                    while i < a_data.len() && a_data[i] == matched_val {
                        i += 1;
                    }
                    while j < b_data.len() && b_data[j] == matched_val {
                        j += 1;
                    }
                }"""
content = content.replace(old_block5, new_block5)

with open("src/difference.rs", "w") as f:
    f.write(content)

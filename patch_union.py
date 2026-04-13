import re

with open("src/union.rs", "r") as f:
    content = f.read()

content = content.replace("use std::{cmp::Ordering, simd::cmp::SimdPartialOrd};", "use std::simd::cmp::SimdPartialOrd;")

old_block1 = """        let val = match a[i].cmp(&b[j]) {
            Ordering::Less => {
                let v = a[i];
                i += 1;
                v
            }
            Ordering::Greater => {
                let v = b[j];
                j += 1;
                v
            }
            Ordering::Equal => {
                let v = a[i];
                i += 1;
                j += 1;
                v
            }
        };"""

new_block1 = """        // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
        let val = if a[i] < b[j] {
            let v = a[i];
            i += 1;
            v
        } else if a[i] > b[j] {
            let v = b[j];
            j += 1;
            v
        } else {
            let v = a[i];
            i += 1;
            j += 1;
            v
        };"""

content = content.replace(old_block1, new_block1)

old_block2 = """            let val = match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    let v = a[i];
                    i += 1;
                    v
                }
                Ordering::Greater => {
                    let v = b[j];
                    j += 1;
                    v
                }
                Ordering::Equal => {
                    let v = a[i];
                    i += 1;
                    j += 1;
                    v
                }
            };"""

new_block2 = """            // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
            let val = if a[i] < b[j] {
                let v = a[i];
                i += 1;
                v
            } else if a[i] > b[j] {
                let v = b[j];
                j += 1;
                v
            } else {
                let v = a[i];
                i += 1;
                j += 1;
                v
            };"""

content = content.replace(old_block2, new_block2)

old_block3 = """        let val = match a[i].cmp(&b[j]) {
            Ordering::Less => {
                let v = a[i];
                i += 1;
                v
            }
            Ordering::Greater => {
                let v = b[j];
                j += 1;
                v
            }
            Ordering::Equal => {
                let v = a[i];
                i += 1;
                j += 1;
                v
            }
        };"""

new_block3 = """        // Optimization: Replacing match cmp with explicit if/else avoids Ordering enum construction, improving branch prediction.
        let val = if a[i] < b[j] {
            let v = a[i];
            i += 1;
            v
        } else if a[i] > b[j] {
            let v = b[j];
            j += 1;
            v
        } else {
            let v = a[i];
            i += 1;
            j += 1;
            v
        };"""

content = content.replace(old_block3, new_block3)

with open("src/union.rs", "w") as f:
    f.write(content)

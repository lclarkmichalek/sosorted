import re

with open("benches/common/mod.rs", "r") as f:
    content = f.read()

replacement = r"#![allow(dead_code, unused_imports, unused_variables, clippy::manual_is_multiple_of)]\n\n//! Common benchmark utilities:"

content = content.replace("//! Common benchmark utilities:", replacement)

with open("benches/common/mod.rs", "w") as f:
    f.write(content)

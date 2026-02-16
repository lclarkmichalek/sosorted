use std::env;

fn main() {
    println!("=== CPU Features Report ===\n");

    // Show compile-time target info
    println!("Target: {}", std::env::consts::ARCH);
    println!("Profile: {}", if cfg!(debug_assertions) { "debug" } else { "release" });
    println!();

    // Runtime detection
    println!("Runtime CPU Features:");
    #[cfg(target_arch = "x86_64")]
    {
        check_feature("sse");
        check_feature("sse2");
        check_feature("sse3");
        check_feature("ssse3");
        check_feature("sse4.1");
        check_feature("sse4.2");
        check_feature("avx");
        check_feature("avx2");
        check_feature("avx512f");
        check_feature("fma");
        check_feature("bmi1");
        check_feature("bmi2");
        check_feature("popcnt");
    }
    println!();

    // Compile-time features (what the compiler knows about)
    println!("Compile-Time Features (cfg):");
    print_cfg("sse", cfg!(target_feature = "sse"));
    print_cfg("sse2", cfg!(target_feature = "sse2"));
    print_cfg("sse3", cfg!(target_feature = "sse3"));
    print_cfg("ssse3", cfg!(target_feature = "ssse3"));
    print_cfg("sse4.1", cfg!(target_feature = "sse4.1"));
    print_cfg("sse4.2", cfg!(target_feature = "sse4.2"));
    print_cfg("avx", cfg!(target_feature = "avx"));
    print_cfg("avx2", cfg!(target_feature = "avx2"));
    print_cfg("avx512f", cfg!(target_feature = "avx512f"));
    print_cfg("fma", cfg!(target_feature = "fma"));
    print_cfg("bmi1", cfg!(target_feature = "bmi1"));
    print_cfg("bmi2", cfg!(target_feature = "bmi2"));
    print_cfg("popcnt", cfg!(target_feature = "popcnt"));
    println!();

    // Show RUSTFLAGS if set
    if let Ok(rustflags) = env::var("RUSTFLAGS") {
        println!("RUSTFLAGS: {}", rustflags);
    } else {
        println!("RUSTFLAGS: (not set)");
    }
}

#[cfg(target_arch = "x86_64")]
fn check_feature(name: &str) {
    let available = match name {
        "sse" => is_x86_feature_detected!("sse"),
        "sse2" => is_x86_feature_detected!("sse2"),
        "sse3" => is_x86_feature_detected!("sse3"),
        "ssse3" => is_x86_feature_detected!("ssse3"),
        "sse4.1" => is_x86_feature_detected!("sse4.1"),
        "sse4.2" => is_x86_feature_detected!("sse4.2"),
        "avx" => is_x86_feature_detected!("avx"),
        "avx2" => is_x86_feature_detected!("avx2"),
        "avx512f" => is_x86_feature_detected!("avx512f"),
        "fma" => is_x86_feature_detected!("fma"),
        "bmi1" => is_x86_feature_detected!("bmi1"),
        "bmi2" => is_x86_feature_detected!("bmi2"),
        "popcnt" => is_x86_feature_detected!("popcnt"),
        _ => false,
    };
    println!("  {:<10} {}", name, if available { "✓" } else { "✗" });
}

fn print_cfg(name: &str, enabled: bool) {
    println!("  {:<10} {}", name, if enabled { "✓" } else { "✗" });
}

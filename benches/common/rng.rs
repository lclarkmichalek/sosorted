//! RNG utilities and seed constants for reproducible benchmarks.

use rand::{rngs::SmallRng, SeedableRng};

/// Default benchmark size (1M elements).
pub const DEFAULT_SIZE: usize = 1024 * 1024;

/// Primary seed for deterministic benchmarks.
pub const SEED_A: [u8; 32] = [
    165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178, 22,
    106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
];

/// Secondary seed for generating second arrays in binary operations.
pub const SEED_B: [u8; 32] = [
    42, 135, 233, 92, 112, 23, 105, 79, 81, 127, 217, 1, 97, 10, 71, 36, 110, 148, 100, 78, 122, 6,
    9, 127, 13, 79, 43, 164, 178, 35, 41, 142,
];

/// Seed for Zipf distribution data.
pub const SEED_ZIPF: [u8; 32] = [
    42, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178, 22,
    106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
];

/// Seed for small runs data.
pub const SEED_SMALL_RUNS: [u8; 32] = [
    99, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178, 22,
    106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
];

/// Seed for clustered data.
pub const SEED_CLUSTERED: [u8; 32] = [
    77, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178, 22,
    106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
];

/// Seed for database IDs data.
pub const SEED_DATABASE_IDS: [u8; 32] = [
    123, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178, 22,
    106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
];

/// Create a seeded RNG from a seed array.
pub fn seeded_rng(seed: [u8; 32]) -> SmallRng {
    SmallRng::from_seed(seed)
}

/// Create an RNG with the default seed (SEED_A).
pub fn default_rng() -> SmallRng {
    SmallRng::from_seed(SEED_A)
}

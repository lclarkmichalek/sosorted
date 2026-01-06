window.BENCHMARK_DATA = {
  "lastUpdate": 1767671766265,
  "repoUrl": "https://github.com/lclarkmichalek/sosorted",
  "entries": {
    "sosorted Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "lclarkmichalek@gmail.com",
            "name": "Laurie Clark-Michalek",
            "username": "lclarkmichalek"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cc1cecd9a6035763570f0694ff9e40a3f9158d72",
          "message": "Fix benchmark CI error by disabling libtest harness for library (#20)\n\nAdd `[lib] bench = false` to Cargo.toml to disable the default libtest\nbenchmark harness for the library target. This prevents libtest from\nintercepting the `--output-format bencher` flag before Criterion can\nprocess it.\n\nThis resolves the CI error:\n  error: Unrecognized option: 'output-format'\n\nthat was occurring in the benchmark workflow when running benchmarks\nwith the bencher output format.\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-authored-by: Claude Opus 4.5 <noreply@anthropic.com>",
          "timestamp": "2026-01-05T19:21:12-08:00",
          "tree_id": "6c09130e2aff2c4bb71418fd8a70682a01ea0f10",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/cc1cecd9a6035763570f0694ff9e40a3f9158d72"
        },
        "date": 1767671765465,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 393801,
            "range": "± 4460",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 1210752,
            "range": "± 17519",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 568051,
            "range": "± 25557",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 61380682,
            "range": "± 3574985",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 445075,
            "range": "± 9453",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 1355491,
            "range": "± 16353",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 671173,
            "range": "± 46575",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 65285442,
            "range": "± 3493327",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 387102,
            "range": "± 3978",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 1203238,
            "range": "± 13833",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 644284,
            "range": "± 34375",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 53759931,
            "range": "± 1544685",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 3010,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 3136,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 31077,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 24694,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 26183,
            "range": "± 388",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 274998,
            "range": "± 2901",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 127266,
            "range": "± 1547",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 161083,
            "range": "± 3722",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10645085,
            "range": "± 50986",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 508359,
            "range": "± 20149",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 589587,
            "range": "± 2583",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 52805438,
            "range": "± 2162483",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 37937,
            "range": "± 428",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 114114,
            "range": "± 339",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 82799,
            "range": "± 801",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 44059,
            "range": "± 413",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 120281,
            "range": "± 5841",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 88956,
            "range": "± 753",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 45252,
            "range": "± 671",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 111176,
            "range": "± 1001",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 79423,
            "range": "± 999",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 98298,
            "range": "± 1253",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 82410,
            "range": "± 685",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 59150,
            "range": "± 261",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 62880,
            "range": "± 545",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 82165,
            "range": "± 1937",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 55563,
            "range": "± 787",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 41597,
            "range": "± 605",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 92835,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 51738,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 338479,
            "range": "± 807",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 327317,
            "range": "± 1002",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 233373,
            "range": "± 763",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 373125,
            "range": "± 773",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 322580,
            "range": "± 2545",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 303145,
            "range": "± 963",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 253561,
            "range": "± 1754",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 198234,
            "range": "± 1126",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 163675,
            "range": "± 847",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 86023,
            "range": "± 5253",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 120677,
            "range": "± 3256",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 81744,
            "range": "± 283",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 52018,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 92581,
            "range": "± 770",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 54157,
            "range": "± 846",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 47056,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 85451,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 50671,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 971,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 810,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 576,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 24285,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 9570,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 7996,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5661,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 255702,
            "range": "± 2461",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 102766,
            "range": "± 1268",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 82282,
            "range": "± 581",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 58928,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2820998,
            "range": "± 10213",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 990756,
            "range": "± 27051",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 829453,
            "range": "± 5387",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 594561,
            "range": "± 2886",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 37024707,
            "range": "± 1671225",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 4987098,
            "range": "± 121562",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4984714,
            "range": "± 52787",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 27730535,
            "range": "± 466558",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 4950478,
            "range": "± 69608",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5267419,
            "range": "± 68568",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 30730878,
            "range": "± 496464",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2787258,
            "range": "± 11891",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 695250,
            "range": "± 3199",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 34077872,
            "range": "± 1937794",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4890319,
            "range": "± 56411",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4868459,
            "range": "± 19900",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2793001,
            "range": "± 7026",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 170561,
            "range": "± 8875",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 533741,
            "range": "± 3333",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 328319,
            "range": "± 7023",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/early_duplicate",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/early_duplicate",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/mid_duplicate",
            "value": 91059,
            "range": "± 6831",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 267372,
            "range": "± 5808",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164322,
            "range": "± 832",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 180787,
            "range": "± 8447",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 546717,
            "range": "± 5257",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 329237,
            "range": "± 2615",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 167,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 531,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 327,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1408,
            "range": "± 56",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4270,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2568,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 46560,
            "range": "± 1369",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 135110,
            "range": "± 566",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 82084,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 184500,
            "range": "± 6528",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 551902,
            "range": "± 6167",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 329579,
            "range": "± 5180",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 7950323,
            "range": "± 105451",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4576826,
            "range": "± 65999",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 26068545,
            "range": "± 636982",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 8192515,
            "range": "± 153104",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4893510,
            "range": "± 58390",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 30617323,
            "range": "± 3382188",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 6712848,
            "range": "± 409099",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 1982070,
            "range": "± 126514",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 107415550,
            "range": "± 13341357",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 5415,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 16873,
            "range": "± 55",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 43684,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 141085,
            "range": "± 265",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1226698,
            "range": "± 4524",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5609355,
            "range": "± 229117",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 5441509,
            "range": "± 70461",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 28693793,
            "range": "± 584514",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 943947,
            "range": "± 3698",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 971144,
            "range": "± 7919",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 159609,
            "range": "± 923",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 173686,
            "range": "± 619",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 28701,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102858,
            "range": "± 1697",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 12687,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94753,
            "range": "± 1858",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 123652,
            "range": "± 2129",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 849263,
            "range": "± 27250",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2031,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 797677,
            "range": "± 3126",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 582821,
            "range": "± 6814",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 573498,
            "range": "± 3139",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 593252,
            "range": "± 1394",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 630208,
            "range": "± 4617",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 667170,
            "range": "± 6521",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 604743,
            "range": "± 6705",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 562295,
            "range": "± 6358",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 334374,
            "range": "± 921",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 228497,
            "range": "± 1076",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 120408,
            "range": "± 1754",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2921,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2479,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 30672,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 66189,
            "range": "± 2993",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 941415,
            "range": "± 1747",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 961146,
            "range": "± 5512",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9788460,
            "range": "± 101283",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9812274,
            "range": "± 38468",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6081351,
            "range": "± 103796",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6425397,
            "range": "± 23544",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 76724150,
            "range": "± 374972",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6161217,
            "range": "± 94856",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6740182,
            "range": "± 12244",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 78938622,
            "range": "± 593626",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2510079,
            "range": "± 43237",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2125825,
            "range": "± 4763",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 73979734,
            "range": "± 5159326",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4925318,
            "range": "± 17131",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4991013,
            "range": "± 19102",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1312438,
            "range": "± 25292",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}
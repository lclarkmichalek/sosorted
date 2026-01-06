window.BENCHMARK_DATA = {
  "lastUpdate": 1767673122260,
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
      },
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
          "id": "aa5742930f38b08aa7ea5ae8f7ba22549a0104ee",
          "message": "Implement adaptive deduplicate with compress & store algorithm (#19)\n\n* Implement adaptive deduplicate with compress & store algorithm\n\nThis commit introduces a major refactor to the deduplicate implementation,\nproviding two distinct algorithms optimized for different duplicate patterns:\n\n1. **New API**: Changed from `deduplicate(data: &mut [T]) -> usize` to\n   `deduplicate(out: &mut [T], input: &[T]) -> usize` to support\n   compress & store pattern\n\n2. **Default Algorithm - Compress & Store with Adaptive Galloping**:\n   - New primary implementation using compress & store pattern\n   - Optimized for realistic data with scattered duplicates\n   - 20-52% faster on common patterns (scattered duplicates, small runs,\n     database IDs)\n   - Uses adaptive galloping for efficient duplicate skipping\n\n3. **Alternative Algorithm - Scan-based** (`deduplicate_scan`):\n   - Renamed from old default implementation\n   - Better for Zipf-like distributions with long contiguous duplicate runs\n   - Preserves performance characteristics of original implementation\n\n4. **Comprehensive Benchmarks**:\n   - Realistic scenarios: scattered duplicates (50%, 10% unique), Zipf\n     distribution, small runs, clustered duplicates, database IDs\n   - Lemire-style benchmarks: duplicate density (0-99%), run length analysis\n   - Algorithm comparison and scaling tests\n   - Combined with upstream benchmark additions\n\nThe new compress & store algorithm excels with realistic duplicate patterns:\n- Scattered duplicates (50% unique): ~20% faster\n- Database IDs (~10% duplicates): ~25% faster\n- Small runs (2-8 elements): ~30% faster\n- Scattered duplicates (10% unique): ~52% faster\n\nThe scan algorithm remains better for Zipf distributions with very long\ncontiguous duplicate runs.\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n* Remove deduplicate_scan, keep only compress & store implementation\n\nSimplify the public API by removing the alternative deduplicate_scan\nfunction. The compress & store implementation with adaptive galloping\nis now the only deduplicate function.\n\nRationale:\n- Compress wins by 20-52% on most realistic data patterns\n- Only loses ~7% on Zipf distribution (acceptable trade-off)\n- Galloping optimization already handles long duplicate runs\n- Simpler API without significant performance trade-offs\n\nChanges:\n- Remove deduplicate_scan function and its tests\n- Remove unused find_first_duplicate import\n- Update lib.rs to only export deduplicate\n- Remove all scan benchmarks\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: Claude Opus 4.5 <noreply@anthropic.com>",
          "timestamp": "2026-01-05T19:39:28-08:00",
          "tree_id": "68bf095a668d0798bee78f2d06acc469888319a9",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/aa5742930f38b08aa7ea5ae8f7ba22549a0104ee"
        },
        "date": 1767673084331,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 612926,
            "range": "± 23057",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 773768,
            "range": "± 3385",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 566583,
            "range": "± 8162",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 52440137,
            "range": "± 3046845",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 738295,
            "range": "± 5263",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 835975,
            "range": "± 4442",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 591773,
            "range": "± 4058",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 51483165,
            "range": "± 2425452",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 690169,
            "range": "± 3276",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 839005,
            "range": "± 107176",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 565630,
            "range": "± 7861",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 52254272,
            "range": "± 4180923",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4201850,
            "range": "± 40733",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3672089,
            "range": "± 18830",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 3950529,
            "range": "± 17823",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1661059,
            "range": "± 15815",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1241194,
            "range": "± 17792",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1359075,
            "range": "± 9872",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 357122,
            "range": "± 2357",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 442075,
            "range": "± 7864",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 541617,
            "range": "± 3415",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2783750,
            "range": "± 12091",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2013309,
            "range": "± 16778",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2075437,
            "range": "± 10646",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 613966,
            "range": "± 3112",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 761641,
            "range": "± 4151",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 684691,
            "range": "± 2670",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2444546,
            "range": "± 13276",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1790510,
            "range": "± 17056",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1721710,
            "range": "± 8710",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 648,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 541,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 33674,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4769,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 24636,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 273463,
            "range": "± 594",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 172362,
            "range": "± 886",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 145907,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 11656471,
            "range": "± 204659",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 608013,
            "range": "± 2382",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 588776,
            "range": "± 2134",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 57852625,
            "range": "± 3785144",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 57766,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 73207,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 82722,
            "range": "± 273",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 57501,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 73228,
            "range": "± 274",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 82420,
            "range": "± 278",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 55400,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 73180,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 79191,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 73453,
            "range": "± 243",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 317252,
            "range": "± 8637",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 59325,
            "range": "± 398",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 46638,
            "range": "± 436",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 73138,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 54722,
            "range": "± 695",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 35242,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 80154,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 47794,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 329349,
            "range": "± 2650",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 262727,
            "range": "± 3683",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 227141,
            "range": "± 555",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 359366,
            "range": "± 1539",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 311920,
            "range": "± 1200",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 299302,
            "range": "± 2009",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 186974,
            "range": "± 1240",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 191146,
            "range": "± 779",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 163726,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 68083,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 107378,
            "range": "± 415",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 82088,
            "range": "± 231",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 45043,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 83945,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 54554,
            "range": "± 651",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 38824,
            "range": "± 185",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 75751,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 50387,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 795,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 776,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 577,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 24169,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7166,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 7201,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5674,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 256461,
            "range": "± 1194",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 73534,
            "range": "± 490",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 352242,
            "range": "± 10859",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 59260,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2899054,
            "range": "± 6461",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 737574,
            "range": "± 9596",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 2696928,
            "range": "± 223188",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 595862,
            "range": "± 3375",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 39476822,
            "range": "± 3443532",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 4980190,
            "range": "± 21754",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4981459,
            "range": "± 23645",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 25038340,
            "range": "± 970056",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 4953222,
            "range": "± 25052",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5244461,
            "range": "± 15566",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 25926294,
            "range": "± 869608",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2791949,
            "range": "± 4857",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 712661,
            "range": "± 4044",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 27908994,
            "range": "± 3769523",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4883968,
            "range": "± 22862",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4859018,
            "range": "± 18005",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2791559,
            "range": "± 4798",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 166935,
            "range": "± 789",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 535430,
            "range": "± 5898",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 329245,
            "range": "± 1134",
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
            "value": 83289,
            "range": "± 577",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 265877,
            "range": "± 2626",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164569,
            "range": "± 759",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 166749,
            "range": "± 1557",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 535211,
            "range": "± 2569",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 328653,
            "range": "± 4748",
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
            "value": 530,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 324,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1294,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4328,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2551,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 41946,
            "range": "± 602",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 134437,
            "range": "± 479",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 82359,
            "range": "± 482",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 167331,
            "range": "± 1201",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 532638,
            "range": "± 1555",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 329349,
            "range": "± 940",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 7542311,
            "range": "± 85476",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4496947,
            "range": "± 30278",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 30063022,
            "range": "± 741812",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 7680198,
            "range": "± 123545",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4755028,
            "range": "± 33875",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 31509745,
            "range": "± 1004962",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 6203113,
            "range": "± 70237",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 1744637,
            "range": "± 25074",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 74149009,
            "range": "± 6917286",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 6021,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17470,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 43888,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 144681,
            "range": "± 580",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1187863,
            "range": "± 23563",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5404864,
            "range": "± 120471",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 5102415,
            "range": "± 75926",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 26207874,
            "range": "± 913207",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 939882,
            "range": "± 2718",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 967983,
            "range": "± 2873",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 159040,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 174009,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 28943,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102920,
            "range": "± 588",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 11280,
            "range": "± 63",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94561,
            "range": "± 819",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 91337,
            "range": "± 476",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 849217,
            "range": "± 3202",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2003,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 799117,
            "range": "± 6624",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 583483,
            "range": "± 1520",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 572837,
            "range": "± 1407",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 593978,
            "range": "± 2348",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 629524,
            "range": "± 1932",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 668449,
            "range": "± 1718",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 605259,
            "range": "± 1867",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 567783,
            "range": "± 4395",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 334987,
            "range": "± 1385",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 228975,
            "range": "± 1298",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 120820,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2887,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2465,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 31892,
            "range": "± 13591",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 67197,
            "range": "± 491",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 942303,
            "range": "± 2319",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 961310,
            "range": "± 1427",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9661925,
            "range": "± 80393",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9729061,
            "range": "± 29662",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6046837,
            "range": "± 108002",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6427052,
            "range": "± 20701",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 71815823,
            "range": "± 742516",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6108817,
            "range": "± 72961",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6777537,
            "range": "± 26340",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 71373004,
            "range": "± 660782",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2109631,
            "range": "± 48674",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2124475,
            "range": "± 4795",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 59722313,
            "range": "± 5035652",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4924962,
            "range": "± 80050",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4930080,
            "range": "± 34935",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1314943,
            "range": "± 21080",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "387bdc31c3614f0be1e4845c5f00ab789d4e60ba",
          "message": "Make intersect clone-free for zero allocation overhead (#17)\n\nRemove all to_vec() clones from V1, V3, and galloping algorithms by\nsplitting each into separate a_rare and b_rare variants that work\nfully in-place.\n\nSafety invariants:\n- When a is rare: intersect_count <= i, so we read a[i] before writing a[intersect_count]\n- When b is rare: freq_idx >= intersect_count, so we read from positions ahead of writes\n\nThis eliminates allocation overhead, especially beneficial for:\n- Small array intersections (allocation was significant overhead)\n- High-frequency intersection operations\n- Memory-constrained environments\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-authored-by: Claude Opus 4.5 <noreply@anthropic.com>",
          "timestamp": "2026-01-05T19:39:43-08:00",
          "tree_id": "8391c612d586c3e6f938cc2de70c53e076f78944",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/387bdc31c3614f0be1e4845c5f00ab789d4e60ba"
        },
        "date": 1767673121397,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 637921,
            "range": "± 20799",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 800914,
            "range": "± 4459",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 629521,
            "range": "± 32922",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 51063788,
            "range": "± 4128893",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 796574,
            "range": "± 3992",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 1102594,
            "range": "± 16950",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 587096,
            "range": "± 5858",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 53260205,
            "range": "± 3466914",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 694882,
            "range": "± 4626",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 842973,
            "range": "± 3829",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 632018,
            "range": "± 2966",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 66129769,
            "range": "± 2289529",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4322739,
            "range": "± 31871",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3785685,
            "range": "± 29957",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 4023404,
            "range": "± 20462",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1719632,
            "range": "± 12048",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1289017,
            "range": "± 16777",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1374886,
            "range": "± 12977",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 364366,
            "range": "± 6597",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 449923,
            "range": "± 5805",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 612842,
            "range": "± 3621",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2938002,
            "range": "± 33466",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2077342,
            "range": "± 16652",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2134922,
            "range": "± 17120",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 597437,
            "range": "± 6551",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 752165,
            "range": "± 8121",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 751427,
            "range": "± 15642",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2444662,
            "range": "± 10398",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1802912,
            "range": "± 9990",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1781942,
            "range": "± 7771",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 660,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 542,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 29593,
            "range": "± 52",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4802,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 25107,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 258305,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 196879,
            "range": "± 781",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 158476,
            "range": "± 600",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10257188,
            "range": "± 26953",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 634301,
            "range": "± 2547",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 655256,
            "range": "± 4695",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 50272286,
            "range": "± 3879620",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 61002,
            "range": "± 649",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 76347,
            "range": "± 236",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 89675,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 60878,
            "range": "± 714",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 76272,
            "range": "± 373",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 89145,
            "range": "± 716",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 58540,
            "range": "± 239",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 76183,
            "range": "± 317",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 85881,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 76600,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 238801,
            "range": "± 11916",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 59519,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 47278,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 73922,
            "range": "± 518",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 53847,
            "range": "± 366",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 38891,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 81059,
            "range": "± 774",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 54771,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 329678,
            "range": "± 1015",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 263040,
            "range": "± 1688",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 233724,
            "range": "± 540",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 363175,
            "range": "± 1407",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 313400,
            "range": "± 1388",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 305688,
            "range": "± 582",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 192091,
            "range": "± 1301",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 191568,
            "range": "± 815",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 163817,
            "range": "± 886",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 72604,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 108241,
            "range": "± 2514",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 88733,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 44830,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 83767,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 54716,
            "range": "± 176",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 38807,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 75675,
            "range": "± 1561",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 50572,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 793,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 785,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 581,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 22078,
            "range": "± 100",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7169,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 7225,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5665,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 234208,
            "range": "± 693",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 73581,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 250511,
            "range": "± 12120",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 59485,
            "range": "± 454",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2571074,
            "range": "± 8346",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 731900,
            "range": "± 20175",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 2754728,
            "range": "± 98489",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 592483,
            "range": "± 2567",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 33927000,
            "range": "± 2123214",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 4929052,
            "range": "± 19356",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4986742,
            "range": "± 17291",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 22877180,
            "range": "± 650058",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 4905887,
            "range": "± 22717",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5222276,
            "range": "± 6513",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 24780795,
            "range": "± 1569552",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2785900,
            "range": "± 12000",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 710547,
            "range": "± 4320",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 28106125,
            "range": "± 1089537",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4860022,
            "range": "± 15133",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4839985,
            "range": "± 10010",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2785535,
            "range": "± 6016",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 166012,
            "range": "± 1434",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 534001,
            "range": "± 1873",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 328675,
            "range": "± 957",
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
            "value": 83480,
            "range": "± 922",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 267142,
            "range": "± 1454",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164703,
            "range": "± 1413",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 169779,
            "range": "± 6901",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 534124,
            "range": "± 7970",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 328632,
            "range": "± 1273",
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
            "value": 530,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 324,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1293,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4352,
            "range": "± 36",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2551,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 42626,
            "range": "± 1566",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 133803,
            "range": "± 4894",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 82260,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 167439,
            "range": "± 2902",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 534015,
            "range": "± 2846",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 328244,
            "range": "± 2819",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4731283,
            "range": "± 84257",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4535701,
            "range": "± 20462",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 29798180,
            "range": "± 642580",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4605256,
            "range": "± 22307",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4739735,
            "range": "± 13686",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 29200488,
            "range": "± 579967",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 2881616,
            "range": "± 24434",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 1786618,
            "range": "± 20273",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 90118522,
            "range": "± 9361913",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2647,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17221,
            "range": "± 55",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 20224,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 142358,
            "range": "± 1574",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1147061,
            "range": "± 14598",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5388495,
            "range": "± 18191",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 4649229,
            "range": "± 41993",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 23916991,
            "range": "± 896044",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 912057,
            "range": "± 1137",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 986549,
            "range": "± 2365",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 158815,
            "range": "± 597",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 175190,
            "range": "± 818",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 28074,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102952,
            "range": "± 608",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 10655,
            "range": "± 53",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94529,
            "range": "± 2561",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 86338,
            "range": "± 454",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 850013,
            "range": "± 4267",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2102,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 798599,
            "range": "± 3762",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 571360,
            "range": "± 1847",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 589575,
            "range": "± 1804",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 587318,
            "range": "± 2626",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 645484,
            "range": "± 1948",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 656340,
            "range": "± 9299",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 616321,
            "range": "± 1523",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 552142,
            "range": "± 3059",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 338851,
            "range": "± 1155",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 177520,
            "range": "± 885",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 127266,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2781,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2472,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 30325,
            "range": "± 3901",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 67509,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 914472,
            "range": "± 1640",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 977379,
            "range": "± 643",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9255106,
            "range": "± 11100",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9866452,
            "range": "± 13678",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 5994579,
            "range": "± 51162",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6429065,
            "range": "± 8970",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 71912479,
            "range": "± 1037397",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6047947,
            "range": "± 40862",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6745147,
            "range": "± 17437",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 73109909,
            "range": "± 1220825",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2440514,
            "range": "± 43221",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2123659,
            "range": "± 87534",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 54805278,
            "range": "± 5977915",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4924672,
            "range": "± 12086",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4987336,
            "range": "± 13064",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1313469,
            "range": "± 23277",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}
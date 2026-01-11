window.BENCHMARK_DATA = {
  "lastUpdate": 1768174174605,
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
          "id": "a87a17ac452f574c5376e5c210a102ceddbb9b96",
          "message": "Refactor mutable APIs to use destination-buffer-first pattern (#22)\n\n* Refactor mutable APIs to use destination-buffer-first pattern\n\nAll mutable operations now follow a consistent pattern where the\ndestination buffer is always the first argument, followed by immutable\ninput slices:\n\n- intersect(dest, a, b) - writes intersection to dest\n- difference(dest, a, b) - writes difference to dest\n- union(dest, a, b) - already followed this pattern\n- deduplicate(dest, input) - already followed this pattern\n\nThis design:\n- Clearly separates output from input\n- Ensures all input data remains immutable\n- Allows callers to control memory allocation\n- Provides API consistency across all operations\n\nUpdated all tests, benchmarks, and documentation to reflect the new\nsignatures.\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n* Fix formatting\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: Claude Opus 4.5 <noreply@anthropic.com>",
          "timestamp": "2026-01-05T20:04:20-08:00",
          "tree_id": "193a1491415ee588da5d07b514eca795f43fe0be",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/a87a17ac452f574c5376e5c210a102ceddbb9b96"
        },
        "date": 1767674609248,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 638652,
            "range": "± 3493",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 798910,
            "range": "± 2368",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 630123,
            "range": "± 9405",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 51353146,
            "range": "± 1624999",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 715028,
            "range": "± 2937",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 866242,
            "range": "± 2832",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 651610,
            "range": "± 2638",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 51151458,
            "range": "± 1453151",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 716451,
            "range": "± 1842",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 863927,
            "range": "± 3296",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 629040,
            "range": "± 7548",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 51873340,
            "range": "± 1166373",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4186428,
            "range": "± 4559",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3645550,
            "range": "± 20887",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 3962068,
            "range": "± 15276",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1674113,
            "range": "± 11417",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1262043,
            "range": "± 10672",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1420832,
            "range": "± 7491",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 388476,
            "range": "± 4155",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 472120,
            "range": "± 1944",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 607148,
            "range": "± 19638",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2776141,
            "range": "± 8126",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2027863,
            "range": "± 5586",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2137198,
            "range": "± 5535",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 629651,
            "range": "± 2233",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 782723,
            "range": "± 2893",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 746754,
            "range": "± 2878",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2439675,
            "range": "± 7399",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1796499,
            "range": "± 11827",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1777165,
            "range": "± 7480",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 658,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 494,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 29276,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4843,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 25395,
            "range": "± 49",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 258904,
            "range": "± 776",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 192099,
            "range": "± 1180",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 159061,
            "range": "± 859",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10204275,
            "range": "± 32379",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 716166,
            "range": "± 2931",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 653402,
            "range": "± 4468",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 44613997,
            "range": "± 1356524",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 61242,
            "range": "± 1731",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 76526,
            "range": "± 687",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 89283,
            "range": "± 269",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 60980,
            "range": "± 222",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 76470,
            "range": "± 442",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 89058,
            "range": "± 422",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 58753,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 76527,
            "range": "± 325",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 85804,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 76953,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 241996,
            "range": "± 17980",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 65869,
            "range": "± 188",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 50446,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 76746,
            "range": "± 1032",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 60967,
            "range": "± 553",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 39278,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 83870,
            "range": "± 225",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 54542,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 336523,
            "range": "± 2633",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 259957,
            "range": "± 1459",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 233010,
            "range": "± 624",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 358607,
            "range": "± 570",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 311429,
            "range": "± 1131",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 305481,
            "range": "± 1367",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 186298,
            "range": "± 817",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 191395,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 169634,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 74413,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 109524,
            "range": "± 721",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 88157,
            "range": "± 738",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 47924,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 86477,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 61279,
            "range": "± 262",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 41892,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 78522,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 56996,
            "range": "± 189",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 861,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 782,
            "range": "± 2",
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
            "value": 22128,
            "range": "± 162",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7170,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 7243,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5661,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 234940,
            "range": "± 486",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 77122,
            "range": "± 2124",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 240724,
            "range": "± 12219",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 65918,
            "range": "± 562",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2572398,
            "range": "± 4153",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 761206,
            "range": "± 4080",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 2726108,
            "range": "± 246179",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 658657,
            "range": "± 3867",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 29832705,
            "range": "± 554902",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5089131,
            "range": "± 32442",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4930090,
            "range": "± 15854",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 22379530,
            "range": "± 910693",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5071952,
            "range": "± 30010",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5168282,
            "range": "± 8195",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 22580454,
            "range": "± 505422",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2950895,
            "range": "± 19761",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 709730,
            "range": "± 1607",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 26546206,
            "range": "± 1145983",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4615681,
            "range": "± 9925",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4594947,
            "range": "± 9662",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2784738,
            "range": "± 7080",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 165537,
            "range": "± 5318",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 534702,
            "range": "± 2457",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 328104,
            "range": "± 1538",
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
            "value": 82844,
            "range": "± 440",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 267757,
            "range": "± 1274",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164129,
            "range": "± 508",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 167014,
            "range": "± 5862",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 534697,
            "range": "± 2451",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 328287,
            "range": "± 3111",
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
            "range": "± 3",
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
            "value": 1294,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4340,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2553,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 41880,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 135761,
            "range": "± 1107",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 81961,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 167305,
            "range": "± 3793",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 536953,
            "range": "± 2250",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 328465,
            "range": "± 1163",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4455686,
            "range": "± 67323",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4220128,
            "range": "± 24036",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 27427893,
            "range": "± 650907",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4486742,
            "range": "± 39097",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4454601,
            "range": "± 14148",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 29073859,
            "range": "± 719413",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 2734249,
            "range": "± 7080",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2350378,
            "range": "± 6375",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 60153087,
            "range": "± 2796249",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2867,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17884,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 20088,
            "range": "± 54",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 148190,
            "range": "± 473",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1110177,
            "range": "± 6385",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5312634,
            "range": "± 11493",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 4462119,
            "range": "± 32064",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 22946265,
            "range": "± 957664",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 889546,
            "range": "± 1515",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 968434,
            "range": "± 1052",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 155645,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 173309,
            "range": "± 1392",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 27435,
            "range": "± 153",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102692,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 11594,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94379,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 116975,
            "range": "± 466",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 848633,
            "range": "± 9088",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2172,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 797978,
            "range": "± 2185",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 557681,
            "range": "± 1675",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 551694,
            "range": "± 948",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 568984,
            "range": "± 2057",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 618233,
            "range": "± 1609",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 644634,
            "range": "± 1626",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 589755,
            "range": "± 958",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 525269,
            "range": "± 1374",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 327306,
            "range": "± 768",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 170776,
            "range": "± 742",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 110346,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2697,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2451,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 54480,
            "range": "± 1073",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 66099,
            "range": "± 208",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 897809,
            "range": "± 993",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 961597,
            "range": "± 746",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9090405,
            "range": "± 84830",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9712111,
            "range": "± 22101",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 5920797,
            "range": "± 24587",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6426246,
            "range": "± 30501",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 75146882,
            "range": "± 1251440",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6017175,
            "range": "± 28090",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6741018,
            "range": "± 16175",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 76412521,
            "range": "± 1343882",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2393540,
            "range": "± 42174",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2119510,
            "range": "± 10933",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 60124828,
            "range": "± 1806937",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4919536,
            "range": "± 23312",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4981178,
            "range": "± 12222",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1310065,
            "range": "± 17890",
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
          "id": "0016dd6a27b1e773bdfd41f8cccb346ab538d229",
          "message": "optimize(find_first_duplicate): SIMD bitmasking and 2x loop unrolling (#23)\n\n* SIMD Bitmasking: Replaced the linear lane-by-lane mask check with to_bitmask().trailing_zeros(). This allows for nearly branchless index calculation of the first duplicate.\n* Loop Unrolling (2x): Unrolled the main SIMD loop twice. Research and benchmarking showed that 2x provides the best balance between reducing instruction overhead and maintaining performance on large, memory-bound datasets (4x showed regressions on 1M+ elements).\n* SimdMaskOps: Updated the trait to expose to_bitmask() efficiently across different SIMD widths.\nBenchmarks: Added new benchmark scenarios simulating database IDs (scattered duplicates and long unique runs) to ensure robust performance across realistic data distributions.",
          "timestamp": "2026-01-05T21:06:28-08:00",
          "tree_id": "cff83a171be92b0c75e8edf3a382d1f31540463f",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/0016dd6a27b1e773bdfd41f8cccb346ab538d229"
        },
        "date": 1767678336930,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 560592,
            "range": "± 12340",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 772852,
            "range": "± 3734",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 634577,
            "range": "± 7138",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 53875930,
            "range": "± 2251643",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 1132811,
            "range": "± 80301",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 940573,
            "range": "± 4719",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 656923,
            "range": "± 4646",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 53935529,
            "range": "± 2435393",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 641420,
            "range": "± 5569",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 918487,
            "range": "± 3627",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 565896,
            "range": "± 3248",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 54365146,
            "range": "± 2491157",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4339668,
            "range": "± 11786",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3565141,
            "range": "± 10362",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 3950716,
            "range": "± 26787",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1652312,
            "range": "± 12659",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1208798,
            "range": "± 8013",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1347762,
            "range": "± 8559",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 356654,
            "range": "± 1786",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 441361,
            "range": "± 22775",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 570642,
            "range": "± 2926",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2790558,
            "range": "± 10497",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 1993198,
            "range": "± 9491",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2177039,
            "range": "± 8123",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 553075,
            "range": "± 2920",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 751018,
            "range": "± 3690",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 752387,
            "range": "± 7134",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2500922,
            "range": "± 7676",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1785833,
            "range": "± 8786",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1796479,
            "range": "± 13382",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 588,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 3087,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 29541,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4283,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 25794,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 255827,
            "range": "± 639",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 169940,
            "range": "± 16263",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 159778,
            "range": "± 818",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10122913,
            "range": "± 44271",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 523285,
            "range": "± 2913",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 590115,
            "range": "± 3575",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 48395906,
            "range": "± 2198297",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 52981,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 76227,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 58565,
            "range": "± 369",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 52671,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 75976,
            "range": "± 808",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 58291,
            "range": "± 682",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 51271,
            "range": "± 231",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 70155,
            "range": "± 390",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 51751,
            "range": "± 323",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 81249,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 163146,
            "range": "± 7564",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 66713,
            "range": "± 1124",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 46630,
            "range": "± 272",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 44833,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 49591,
            "range": "± 6938",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 38518,
            "range": "± 1738",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 49018,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 47669,
            "range": "± 258",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 340922,
            "range": "± 556",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 250026,
            "range": "± 1064",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 234704,
            "range": "± 4327",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 366033,
            "range": "± 29074",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 298310,
            "range": "± 7200",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 294541,
            "range": "± 1169",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 189606,
            "range": "± 608",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 169244,
            "range": "± 1314",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 167456,
            "range": "± 697",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 71350,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 78000,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 82118,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 45577,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 53147,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 54829,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 38817,
            "range": "± 337",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 44635,
            "range": "± 306",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 50404,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 843,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 614,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 523,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 22641,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7962,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5815,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5679,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 236389,
            "range": "± 389",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 81198,
            "range": "± 382",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 163986,
            "range": "± 5490",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 60056,
            "range": "± 324",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2600108,
            "range": "± 35641",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 844821,
            "range": "± 4723",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 1267166,
            "range": "± 54912",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 603074,
            "range": "± 3269",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 31662415,
            "range": "± 1731379",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5157363,
            "range": "± 39731",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4936677,
            "range": "± 11995",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 22622873,
            "range": "± 775773",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5129822,
            "range": "± 37705",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5154571,
            "range": "± 17917",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 24118647,
            "range": "± 1816398",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2991676,
            "range": "± 28352",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 711870,
            "range": "± 2777",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 27448039,
            "range": "± 1058817",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4634143,
            "range": "± 12912",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4608658,
            "range": "± 8753",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2786430,
            "range": "± 23209",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 165271,
            "range": "± 1295",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 546116,
            "range": "± 2239",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 491557,
            "range": "± 5707",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 82955,
            "range": "± 498",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 273659,
            "range": "± 9918",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 252285,
            "range": "± 7819",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 166533,
            "range": "± 2231",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 543882,
            "range": "± 1848",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 493100,
            "range": "± 6275",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 154,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 528,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 483,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1176,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4354,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 3823,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 40751,
            "range": "± 352",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 137224,
            "range": "± 535",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 123026,
            "range": "± 970",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 159621,
            "range": "± 2531",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 547095,
            "range": "± 2131",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 492096,
            "range": "± 6713",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 151905,
            "range": "± 1774",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 521181,
            "range": "± 4091",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 131310,
            "range": "± 1431",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 469832,
            "range": "± 3948",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4504905,
            "range": "± 63517",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4191024,
            "range": "± 38066",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 23357469,
            "range": "± 611450",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4522668,
            "range": "± 45941",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4451575,
            "range": "± 35622",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 24864939,
            "range": "± 640175",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 3172714,
            "range": "± 33454",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2103817,
            "range": "± 13809",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 64699939,
            "range": "± 5690861",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2672,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17824,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 19648,
            "range": "± 138",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 147269,
            "range": "± 615",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1106034,
            "range": "± 52522",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5307112,
            "range": "± 29372",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 4504148,
            "range": "± 55695",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 24287907,
            "range": "± 698495",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 895618,
            "range": "± 1103",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 953449,
            "range": "± 2261",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 156263,
            "range": "± 673",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 170764,
            "range": "± 917",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 27906,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102149,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 11720,
            "range": "± 85",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94206,
            "range": "± 355",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 109000,
            "range": "± 4273",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 849140,
            "range": "± 8705",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2202,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 798604,
            "range": "± 2188",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 552677,
            "range": "± 856",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 539977,
            "range": "± 1626",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 564649,
            "range": "± 19202",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 608183,
            "range": "± 2665",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 635998,
            "range": "± 825",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 578380,
            "range": "± 853",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 534874,
            "range": "± 1493",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 324331,
            "range": "± 868",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 169085,
            "range": "± 672",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 107921,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2787,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2452,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 29014,
            "range": "± 763",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 65198,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 896494,
            "range": "± 1028",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 945741,
            "range": "± 1648",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9142736,
            "range": "± 94048",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9597746,
            "range": "± 31383",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6298984,
            "range": "± 155088",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6177599,
            "range": "± 24176",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 70109944,
            "range": "± 851524",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6266772,
            "range": "± 65334",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6353596,
            "range": "± 9147",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 70663930,
            "range": "± 1013460",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2002963,
            "range": "± 78135",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2165336,
            "range": "± 7138",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 55233025,
            "range": "± 5511826",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4754973,
            "range": "± 9169",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4859928,
            "range": "± 11994",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1310788,
            "range": "± 7882",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "411d14e62de1295502b96d7efbd9128a2b769233",
          "message": "Update AGENTS.md with accurate API descriptions and benchmarks (#26)\n\n- Corrected descriptions for `deduplicate` and `difference` to clarify they write to a destination buffer rather than modifying in-place.\n- Updated \"Memory efficiency\" section to reflect the destination buffer pattern.\n- Added `difference` to the list of current benchmarks.\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-06T06:03:27Z",
          "tree_id": "80bae77787864a5611a2fea40700463b86c26811",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/411d14e62de1295502b96d7efbd9128a2b769233"
        },
        "date": 1767681764264,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 558651,
            "range": "± 2745",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 771264,
            "range": "± 2592",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 563377,
            "range": "± 15821",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 47744737,
            "range": "± 919732",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 639515,
            "range": "± 6863",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 930236,
            "range": "± 11294",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 588442,
            "range": "± 2382",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 61856236,
            "range": "± 8501918",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 612711,
            "range": "± 6407",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 916471,
            "range": "± 3186",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 631815,
            "range": "± 3365",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 45859555,
            "range": "± 959141",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4303769,
            "range": "± 11599",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3564182,
            "range": "± 11139",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 3987836,
            "range": "± 14561",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1660536,
            "range": "± 4601",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1231203,
            "range": "± 8312",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1417388,
            "range": "± 10411",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 387796,
            "range": "± 32550",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 440439,
            "range": "± 8052",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 500808,
            "range": "± 2083",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2782187,
            "range": "± 3960",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 1975585,
            "range": "± 4907",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2162663,
            "range": "± 42044",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 526255,
            "range": "± 4710",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 790659,
            "range": "± 2185",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 747522,
            "range": "± 2528",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2511990,
            "range": "± 11280",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1803794,
            "range": "± 22413",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1805287,
            "range": "± 15329",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 577,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 492,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 32658,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4171,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 4354,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 282528,
            "range": "± 416",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 153049,
            "range": "± 1146",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 160019,
            "range": "± 6114",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 11206308,
            "range": "± 275815",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 520618,
            "range": "± 3152",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 588779,
            "range": "± 2127",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 57486638,
            "range": "± 6923825",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 54082,
            "range": "± 232",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 77474,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 59086,
            "range": "± 901",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 54242,
            "range": "± 320",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 74933,
            "range": "± 341",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 59206,
            "range": "± 700",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 52710,
            "range": "± 318",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 74389,
            "range": "± 376",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 58163,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 83158,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 120919,
            "range": "± 7354",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 60826,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 46938,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 47848,
            "range": "± 2163",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 56085,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 36077,
            "range": "± 1354",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 49441,
            "range": "± 1428",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 48235,
            "range": "± 200",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 344821,
            "range": "± 741",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 250525,
            "range": "± 791",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 232373,
            "range": "± 980",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 370802,
            "range": "± 1424",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 299602,
            "range": "± 986",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 295815,
            "range": "± 603",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 187012,
            "range": "± 424",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 169599,
            "range": "± 440",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 167924,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 66721,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 81387,
            "range": "± 487",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 83698,
            "range": "± 253",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 45880,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 53511,
            "range": "± 841",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 55230,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 39223,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 45180,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 57345,
            "range": "± 519",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 859,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 632,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 483,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 25655,
            "range": "± 1313",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7939,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5770,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5642,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 274925,
            "range": "± 639",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 83060,
            "range": "± 1730",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 119361,
            "range": "± 8700",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 66736,
            "range": "± 448",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 3091463,
            "range": "± 7935",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 845275,
            "range": "± 11933",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 1328640,
            "range": "± 70996",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 600925,
            "range": "± 3122",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 48895433,
            "range": "± 7605035",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5199260,
            "range": "± 72393",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4929310,
            "range": "± 16234",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 21920102,
            "range": "± 326183",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5073907,
            "range": "± 17656",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5156993,
            "range": "± 13472",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 22891181,
            "range": "± 434466",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2952808,
            "range": "± 20740",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 694790,
            "range": "± 2509",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 26845254,
            "range": "± 755063",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4615792,
            "range": "± 6894",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4596132,
            "range": "± 11520",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2787570,
            "range": "± 15300",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 161351,
            "range": "± 1839",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 545192,
            "range": "± 1978",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 491437,
            "range": "± 6736",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 81879,
            "range": "± 580",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 272547,
            "range": "± 735",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 245826,
            "range": "± 2217",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 162574,
            "range": "± 2167",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 545402,
            "range": "± 2225",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 491739,
            "range": "± 6400",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 135,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 529,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 483,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1180,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4322,
            "range": "± 11",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 3827,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 36800,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 137948,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 123054,
            "range": "± 975",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 146440,
            "range": "± 2069",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 546742,
            "range": "± 3402",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 491832,
            "range": "± 6278",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 135601,
            "range": "± 1352",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 520382,
            "range": "± 13984",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 130415,
            "range": "± 943",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 470230,
            "range": "± 3570",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4433139,
            "range": "± 28581",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4164930,
            "range": "± 19588",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 23978498,
            "range": "± 1667380",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4430246,
            "range": "± 27699",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4390503,
            "range": "± 20979",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 23894052,
            "range": "± 745873",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 3155845,
            "range": "± 5340",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2085010,
            "range": "± 15044",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 56031459,
            "range": "± 2491303",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2647,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 19926,
            "range": "± 43",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 19666,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 164933,
            "range": "± 1115",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 1108986,
            "range": "± 8690",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 6308362,
            "range": "± 294212",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 4629345,
            "range": "± 87216",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 33635289,
            "range": "± 1640560",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 897013,
            "range": "± 1913",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 955121,
            "range": "± 1346",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 156157,
            "range": "± 994",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 170997,
            "range": "± 1316",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 28044,
            "range": "± 511",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102281,
            "range": "± 2482",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 10559,
            "range": "± 57",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94195,
            "range": "± 2406",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 90223,
            "range": "± 1945",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 848837,
            "range": "± 2658",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2239,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 797613,
            "range": "± 2653",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 552232,
            "range": "± 3081",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 539901,
            "range": "± 1634",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 564365,
            "range": "± 1457",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 606512,
            "range": "± 1819",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 637379,
            "range": "± 1881",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 579406,
            "range": "± 1262",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 535937,
            "range": "± 4326",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 325571,
            "range": "± 1095",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 169353,
            "range": "± 972",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 107792,
            "range": "± 2141",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2798,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2446,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 54937,
            "range": "± 512",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 65181,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 896249,
            "range": "± 1214",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 945647,
            "range": "± 1866",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9087538,
            "range": "± 18340",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9545649,
            "range": "± 40712",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6148798,
            "range": "± 18809",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6174805,
            "range": "± 11397",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 68934388,
            "range": "± 472395",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6154550,
            "range": "± 35142",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6377716,
            "range": "± 17792",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 72652425,
            "range": "± 1543901",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2548340,
            "range": "± 52258",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2169740,
            "range": "± 10934",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 62506415,
            "range": "± 10510117",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4751682,
            "range": "± 10104",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4861889,
            "range": "± 13196",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1311204,
            "range": "± 7875",
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
          "id": "a995c4422b842f8535539abb5101b010e59ea335",
          "message": "optimize(intersect): scalar fallback for dense data and SIMD bitmasking for sparse (#27)",
          "timestamp": "2026-01-06T06:27:39Z",
          "tree_id": "da98cd91117086becff9c339769cac4aef68d4fe",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/a995c4422b842f8535539abb5101b010e59ea335"
        },
        "date": 1767683196755,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 560240,
            "range": "± 6184",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 775202,
            "range": "± 52028",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 561220,
            "range": "± 11216",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 57915323,
            "range": "± 3510117",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 952752,
            "range": "± 80727",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 951999,
            "range": "± 13721",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 665761,
            "range": "± 5083",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 56757484,
            "range": "± 2854008",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 1367733,
            "range": "± 15733",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 918472,
            "range": "± 6886",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 563792,
            "range": "± 3848",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 58663882,
            "range": "± 4237463",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4333493,
            "range": "± 13483",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3572545,
            "range": "± 16052",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 4003789,
            "range": "± 19298",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1672056,
            "range": "± 11430",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1248864,
            "range": "± 33793",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1356637,
            "range": "± 25271",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 357464,
            "range": "± 3550",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 478290,
            "range": "± 6947",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 572298,
            "range": "± 5582",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2797510,
            "range": "± 24459",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 1987754,
            "range": "± 23330",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2178309,
            "range": "± 9312",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 622748,
            "range": "± 6246",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 797178,
            "range": "± 8857",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 753900,
            "range": "± 5023",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2517229,
            "range": "± 15047",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1813879,
            "range": "± 13236",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1750748,
            "range": "± 22392",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 576,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 539,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 29747,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4182,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 24499,
            "range": "± 322",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 259134,
            "range": "± 2576",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 161664,
            "range": "± 748",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 145980,
            "range": "± 8385",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10067198,
            "range": "± 100125",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 556178,
            "range": "± 2960",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 659691,
            "range": "± 4072",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 50679991,
            "range": "± 3671836",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 53561,
            "range": "± 639",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 76150,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 58578,
            "range": "± 546",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 49902,
            "range": "± 1866",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 72849,
            "range": "± 547",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 51620,
            "range": "± 618",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 48486,
            "range": "± 352",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 73136,
            "range": "± 330",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 58026,
            "range": "± 395",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 84061,
            "range": "± 407",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 182091,
            "range": "± 11394",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 59770,
            "range": "± 255",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 46563,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 47766,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 55842,
            "range": "± 728",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 38941,
            "range": "± 252",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 48966,
            "range": "± 188",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 47609,
            "range": "± 167",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 336110,
            "range": "± 3624",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 250956,
            "range": "± 1171",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 227833,
            "range": "± 1881",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 369761,
            "range": "± 3397",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 298567,
            "range": "± 1223",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 294238,
            "range": "± 836",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 187406,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 170489,
            "range": "± 4734",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 167739,
            "range": "± 1770",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 69455,
            "range": "± 1357",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 80996,
            "range": "± 429",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 88185,
            "range": "± 623",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 48732,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 56292,
            "range": "± 1132",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 61608,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 42257,
            "range": "± 1534",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 47803,
            "range": "± 375",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 57085,
            "range": "± 397",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 856,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 631,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 537,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 22539,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7942,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5768,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5677,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 237484,
            "range": "± 1974",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 81366,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 179804,
            "range": "± 7935",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 59746,
            "range": "± 415",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2592594,
            "range": "± 10313",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 815060,
            "range": "± 6712",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 1380210,
            "range": "± 70009",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 674394,
            "range": "± 5422",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 34273949,
            "range": "± 3709580",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5230949,
            "range": "± 66943",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4944203,
            "range": "± 14346",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 24898881,
            "range": "± 1088515",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5147879,
            "range": "± 139654",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5159320,
            "range": "± 20459",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 27261604,
            "range": "± 1071776",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 3058311,
            "range": "± 79780",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 712067,
            "range": "± 7889",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 33002653,
            "range": "± 6129753",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4652554,
            "range": "± 22836",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4642407,
            "range": "± 32726",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2786005,
            "range": "± 67468",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 161860,
            "range": "± 2984",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 545455,
            "range": "± 1679",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 491771,
            "range": "± 6370",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 82469,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 272804,
            "range": "± 825",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 245834,
            "range": "± 2016",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 162252,
            "range": "± 2227",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 546725,
            "range": "± 2111",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 492122,
            "range": "± 10531",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 141,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 529,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 491,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1172,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4336,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 3827,
            "range": "± 24",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 41718,
            "range": "± 847",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 137779,
            "range": "± 872",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 122938,
            "range": "± 654",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 162394,
            "range": "± 5587",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 547377,
            "range": "± 2320",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 491558,
            "range": "± 6039",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 155093,
            "range": "± 1630",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 522169,
            "range": "± 2293",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 129155,
            "range": "± 2657",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 470944,
            "range": "± 3418",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 3902802,
            "range": "± 40349",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4236767,
            "range": "± 38979",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 25648813,
            "range": "± 1014828",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 3957249,
            "range": "± 96705",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4549417,
            "range": "± 52830",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 26474444,
            "range": "± 767911",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 1131842,
            "range": "± 25765",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2111495,
            "range": "± 14094",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 65835423,
            "range": "± 5666510",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2165,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17832,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 17097,
            "range": "± 73",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 147142,
            "range": "± 283",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 766042,
            "range": "± 2769",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5432033,
            "range": "± 47986",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 3928968,
            "range": "± 49948",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 26245948,
            "range": "± 938958",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 842346,
            "range": "± 10503",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 985191,
            "range": "± 2087",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 156426,
            "range": "± 245",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 171167,
            "range": "± 362",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 27867,
            "range": "± 167",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102240,
            "range": "± 293",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 12061,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94290,
            "range": "± 478",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 90727,
            "range": "± 336",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 849525,
            "range": "± 18717",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2132,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 798402,
            "range": "± 3671",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 445124,
            "range": "± 1148",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 540925,
            "range": "± 3894",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 449343,
            "range": "± 1943",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 615945,
            "range": "± 4089",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 490842,
            "range": "± 1741",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 589533,
            "range": "± 2047",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 274196,
            "range": "± 640",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 328397,
            "range": "± 1605",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 107803,
            "range": "± 731",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 110758,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2319,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2455,
            "range": "± 62",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 23404,
            "range": "± 964",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 67500,
            "range": "± 484",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 841413,
            "range": "± 4162",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 946265,
            "range": "± 1250",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 8762161,
            "range": "± 90760",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9706146,
            "range": "± 163451",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6317949,
            "range": "± 87345",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6197133,
            "range": "± 193236",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 77105101,
            "range": "± 1138243",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6258099,
            "range": "± 60813",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6391546,
            "range": "± 180131",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 77763953,
            "range": "± 799828",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2060586,
            "range": "± 67551",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2160950,
            "range": "± 48171",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 70103136,
            "range": "± 6208957",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4754458,
            "range": "± 135887",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4860890,
            "range": "± 20766",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1310543,
            "range": "± 108747",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c3660c3b92b1100e7f58bf54ac4dba5a4bbb7e40",
          "message": "Update docs to reflect generic integer support (#28)\n\n- Updated `AGENTS.md` to remove stale `u64` references and clarify the generic nature of the library.\n- Updated `AGENTS.md` to reflect technical details about SIMD lane counts and `SortedSimdElement` trait.\n- Updated `README.md` to explicitly list supported integer types and ensure consistency with the codebase.\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-07T06:11:02Z",
          "tree_id": "8ee3259d690524e693019b5b4219871e3e0a5ae3",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/c3660c3b92b1100e7f58bf54ac4dba5a4bbb7e40"
        },
        "date": 1767768580963,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 530347,
            "range": "± 4377",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 774221,
            "range": "± 2697",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 564043,
            "range": "± 49289",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 56598031,
            "range": "± 3834761",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 607343,
            "range": "± 5902",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 909788,
            "range": "± 3450",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 591007,
            "range": "± 2660",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 56867841,
            "range": "± 3381167",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 612367,
            "range": "± 5335",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 921000,
            "range": "± 3571",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 565690,
            "range": "± 19851",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 58144430,
            "range": "± 4467530",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4357991,
            "range": "± 26751",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3597373,
            "range": "± 16312",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 4009094,
            "range": "± 14256",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1668485,
            "range": "± 13643",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1227516,
            "range": "± 35289",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1357122,
            "range": "± 9797",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 359027,
            "range": "± 3473",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 445195,
            "range": "± 7438",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 502150,
            "range": "± 17545",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2788591,
            "range": "± 14161",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2003204,
            "range": "± 25154",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2111016,
            "range": "± 64160",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 532462,
            "range": "± 8660",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 772046,
            "range": "± 4478",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 688273,
            "range": "± 4005",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2522738,
            "range": "± 56910",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1802550,
            "range": "± 36801",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1744580,
            "range": "± 12650",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 583,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 492,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 29598,
            "range": "± 794",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4208,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 25121,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 257285,
            "range": "± 491",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 147761,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 146391,
            "range": "± 856",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10080372,
            "range": "± 28887",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 523651,
            "range": "± 4225",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 588462,
            "range": "± 9579",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 53212821,
            "range": "± 3929511",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 51910,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 75231,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 52468,
            "range": "± 2178",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 51788,
            "range": "± 333",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 74730,
            "range": "± 1600",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 52447,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 50569,
            "range": "± 256",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 72071,
            "range": "± 429",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 52084,
            "range": "± 523",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 83527,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 133667,
            "range": "± 5569",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 61838,
            "range": "± 1000",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 48755,
            "range": "± 275",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 46971,
            "range": "± 510",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 50890,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 37462,
            "range": "± 653",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 51131,
            "range": "± 891",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 49299,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 334585,
            "range": "± 3159",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 249418,
            "range": "± 1443",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 227572,
            "range": "± 1197",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 369136,
            "range": "± 1164",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 298975,
            "range": "± 736",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 295794,
            "range": "± 815",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 187316,
            "range": "± 2196",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 171245,
            "range": "± 979",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 169335,
            "range": "± 593",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 68111,
            "range": "± 1775",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 79951,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 84813,
            "range": "± 494",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 47872,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 55220,
            "range": "± 222",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 56411,
            "range": "± 329",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 41062,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 46765,
            "range": "± 215",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 51983,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 853,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 632,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 527,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 22535,
            "range": "± 479",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7939,
            "range": "± 34",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5773,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5668,
            "range": "± 12",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 236607,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 83501,
            "range": "± 404",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 144761,
            "range": "± 6255",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 61186,
            "range": "± 286",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2595386,
            "range": "± 6499",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 816345,
            "range": "± 6078",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 1042788,
            "range": "± 36673",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 600608,
            "range": "± 3747",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 31163286,
            "range": "± 2659754",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5185368,
            "range": "± 58950",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4932448,
            "range": "± 192132",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 22329831,
            "range": "± 1067010",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5118300,
            "range": "± 42075",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5211504,
            "range": "± 21576",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 24313096,
            "range": "± 1647290",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 3011493,
            "range": "± 42359",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 712276,
            "range": "± 5504",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 27771627,
            "range": "± 2763403",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4635422,
            "range": "± 141308",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4623497,
            "range": "± 134073",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2791587,
            "range": "± 18977",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 164584,
            "range": "± 3799",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 531777,
            "range": "± 19993",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 329133,
            "range": "± 2844",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/mid_duplicate",
            "value": 82301,
            "range": "± 424",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 265716,
            "range": "± 1385",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164857,
            "range": "± 2673",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 161662,
            "range": "± 2474",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 531085,
            "range": "± 5574",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 328969,
            "range": "± 2057",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 155,
            "range": "± 1",
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
            "value": 1221,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4316,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2552,
            "range": "± 54",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 37303,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 134874,
            "range": "± 4997",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 82399,
            "range": "± 700",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 147286,
            "range": "± 2046",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 532395,
            "range": "± 19922",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 329004,
            "range": "± 9920",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 140101,
            "range": "± 2054",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 507287,
            "range": "± 1772",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 136113,
            "range": "± 1979",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 458263,
            "range": "± 4413",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 3827713,
            "range": "± 47190",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4212121,
            "range": "± 56871",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 24027211,
            "range": "± 977790",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 3845294,
            "range": "± 37450",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4490160,
            "range": "± 56981",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 25674218,
            "range": "± 1188205",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 1136589,
            "range": "± 29451",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2123573,
            "range": "± 11370",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 58368666,
            "range": "± 5670127",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2171,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17776,
            "range": "± 43",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 17133,
            "range": "± 1762",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 147646,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 763900,
            "range": "± 4145",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5425127,
            "range": "± 14045",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 3875547,
            "range": "± 40483",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 25919647,
            "range": "± 709017",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 841705,
            "range": "± 1496",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 983878,
            "range": "± 14695",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 156054,
            "range": "± 249",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 171065,
            "range": "± 394",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 27874,
            "range": "± 143",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102214,
            "range": "± 252",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 10944,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94120,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 90696,
            "range": "± 486",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 849498,
            "range": "± 25954",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2238,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 799431,
            "range": "± 3328",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 444364,
            "range": "± 2130",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 540698,
            "range": "± 3133",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 448185,
            "range": "± 1051",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 613756,
            "range": "± 4226",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 490283,
            "range": "± 13203",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 590305,
            "range": "± 1561",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 274336,
            "range": "± 893",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 328088,
            "range": "± 1094",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 104747,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 108009,
            "range": "± 6457",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2305,
            "range": "± 13",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2443,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 23458,
            "range": "± 316",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 67502,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 842666,
            "range": "± 13736",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 945928,
            "range": "± 2120",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 8686026,
            "range": "± 264449",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9629577,
            "range": "± 53675",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6244311,
            "range": "± 68494",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6183827,
            "range": "± 12975",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 70967897,
            "range": "± 1737661",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6264125,
            "range": "± 50347",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6442415,
            "range": "± 14421",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 72887955,
            "range": "± 920308",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 1994461,
            "range": "± 41485",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2219289,
            "range": "± 6758",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 54801243,
            "range": "± 4495457",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4745513,
            "range": "± 8301",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4769157,
            "range": "± 39501",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1312892,
            "range": "± 9168",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bf83bb2b68e7bcdd7eee6a20ef38f828f5cbc17a",
          "message": "feat: Optimize find_first_duplicate with combined mask checks (#29)\n\nCombined SIMD mask checks in `find_first_duplicate` loop to reduce\nbranching overhead in the common case (no duplicates found).\nThis reduces the number of checks by 50% when scanning unique data.\n\nBenchmarks show ~14% improvement for large arrays on AVX2:\nfind_first_duplicate_scaling/sosorted/1048576: 503 µs -> 433 µs\nfind_first_duplicate/sosorted/all_unique: 484 µs -> 471 µs (~2.8%)\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-07T06:13:21Z",
          "tree_id": "f7080bbeb1bda9f8af0ebd6415946be7e53edac2",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/bf83bb2b68e7bcdd7eee6a20ef38f828f5cbc17a"
        },
        "date": 1767768771302,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 574515,
            "range": "± 11064",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 813395,
            "range": "± 7880",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 642696,
            "range": "± 38419",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 54825375,
            "range": "± 6943596",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 1000783,
            "range": "± 8888",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 957263,
            "range": "± 30757",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 661966,
            "range": "± 3988",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 68351344,
            "range": "± 2957809",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 1377899,
            "range": "± 9500",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 936792,
            "range": "± 15465",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 574050,
            "range": "± 12979",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 65414213,
            "range": "± 3921379",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4348018,
            "range": "± 73617",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 3568874,
            "range": "± 26309",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 3992770,
            "range": "± 29526",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 1723551,
            "range": "± 33539",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1287747,
            "range": "± 19979",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1436224,
            "range": "± 142690",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 414734,
            "range": "± 16991",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 495780,
            "range": "± 5476",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 508738,
            "range": "± 4395",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 2880654,
            "range": "± 11204",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2064371,
            "range": "± 28274",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2154996,
            "range": "± 20127",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 542492,
            "range": "± 6916",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 764295,
            "range": "± 27399",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 683350,
            "range": "± 2080",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2576760,
            "range": "± 64035",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 1849289,
            "range": "± 16531",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 1817805,
            "range": "± 37247",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 590,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 3096,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 31741,
            "range": "± 1654",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4229,
            "range": "± 40",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 25109,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 255906,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 162009,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 160416,
            "range": "± 2544",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 10198403,
            "range": "± 204866",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 530708,
            "range": "± 4322",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 591223,
            "range": "± 3003",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 55428938,
            "range": "± 1003204",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 49684,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 76018,
            "range": "± 1415",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 51945,
            "range": "± 215",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 49564,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 72821,
            "range": "± 516",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 58429,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 48018,
            "range": "± 160",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 73153,
            "range": "± 1150",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 51268,
            "range": "± 973",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 81286,
            "range": "± 286",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 171160,
            "range": "± 8282",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 59819,
            "range": "± 3201",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 46434,
            "range": "± 387",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 44602,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 49196,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 38465,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 52022,
            "range": "± 391",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 53867,
            "range": "± 327",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 340584,
            "range": "± 675",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 249808,
            "range": "± 1625",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 233720,
            "range": "± 1563",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 361568,
            "range": "± 1098",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 298106,
            "range": "± 745",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 300093,
            "range": "± 636",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 187206,
            "range": "± 339",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 170895,
            "range": "± 571",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 167120,
            "range": "± 871",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 68886,
            "range": "± 187",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 77569,
            "range": "± 364",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 81630,
            "range": "± 1620",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 44557,
            "range": "± 472",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 55293,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 54436,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 38593,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 44345,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 56697,
            "range": "± 1079",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 857,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 637,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 483,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 22673,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7951,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5751,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5673,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 236609,
            "range": "± 3875",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 83422,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 178527,
            "range": "± 9741",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 66804,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2596028,
            "range": "± 5523",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 842939,
            "range": "± 5238",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 1207043,
            "range": "± 52690",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 600196,
            "range": "± 1392",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 32388302,
            "range": "± 1783867",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5186491,
            "range": "± 77936",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 4922114,
            "range": "± 48762",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 25696099,
            "range": "± 1351766",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 5231786,
            "range": "± 41040",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 5189633,
            "range": "± 17981",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 31710620,
            "range": "± 1320370",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 3039657,
            "range": "± 55598",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 692733,
            "range": "± 2465",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 33081447,
            "range": "± 997106",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4616457,
            "range": "± 13271",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4703608,
            "range": "± 14592",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2791441,
            "range": "± 6907",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 174492,
            "range": "± 2190",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 534213,
            "range": "± 2395",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 328502,
            "range": "± 2044",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 86916,
            "range": "± 1235",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 267669,
            "range": "± 1964",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 164530,
            "range": "± 2735",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 175751,
            "range": "± 1831",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 540969,
            "range": "± 2251",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 328456,
            "range": "± 2143",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 150,
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
            "value": 1342,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4337,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2553,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 39409,
            "range": "± 541",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 136031,
            "range": "± 511",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 82297,
            "range": "± 705",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 157408,
            "range": "± 3414",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 534013,
            "range": "± 2146",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 328295,
            "range": "± 1317",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 151895,
            "range": "± 984",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 515508,
            "range": "± 3270",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 146619,
            "range": "± 2047",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 463237,
            "range": "± 3519",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4032444,
            "range": "± 23466",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4392834,
            "range": "± 17045",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 26166072,
            "range": "± 175788",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4050937,
            "range": "± 24862",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4665635,
            "range": "± 220975",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 28632258,
            "range": "± 220532",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 1204037,
            "range": "± 26612",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 2153605,
            "range": "± 7721",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 94017706,
            "range": "± 4523333",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 2151,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 17654,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 17110,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 146643,
            "range": "± 10394",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 766360,
            "range": "± 3511",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 5303146,
            "range": "± 106741",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 3971087,
            "range": "± 60020",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 28064784,
            "range": "± 924843",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 842796,
            "range": "± 1500",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 985974,
            "range": "± 1663",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 155977,
            "range": "± 435",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 171224,
            "range": "± 824",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 27860,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 102076,
            "range": "± 357",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 11341,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 94088,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 89875,
            "range": "± 740",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 848753,
            "range": "± 2883",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2265,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 798099,
            "range": "± 4754",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 446871,
            "range": "± 1580",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 542741,
            "range": "± 15276",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 449502,
            "range": "± 1472",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 615271,
            "range": "± 2589",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 491832,
            "range": "± 3909",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 590240,
            "range": "± 1608",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 276110,
            "range": "± 677",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 328797,
            "range": "± 1186",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 107803,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 110386,
            "range": "± 844",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 2305,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 2452,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 21640,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 67559,
            "range": "± 1164",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 842466,
            "range": "± 1422",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 945600,
            "range": "± 3865",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 8685937,
            "range": "± 80081",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9603732,
            "range": "± 31449",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6210347,
            "range": "± 98158",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6177755,
            "range": "± 131453",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 72058233,
            "range": "± 1399202",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 6398178,
            "range": "± 72318",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6411024,
            "range": "± 13520",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 73238728,
            "range": "± 932029",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 2618872,
            "range": "± 55712",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2168722,
            "range": "± 12119",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 68783351,
            "range": "± 6774576",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4747147,
            "range": "± 9372",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4846162,
            "range": "± 26312",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1310064,
            "range": "± 6732",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6ca9aa6b1c41d10d589bbd84d157420672a42301",
          "message": "Clarify difference operation behavior in documentation (#31)\n\nUpdated the README and docstrings for `difference` and `difference_size` to explicitly state that if an element appears in `b`, all occurrences of that element are removed from `a`. This clarifies the behavior regarding duplicates in `a`.\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-07T21:51:18-08:00",
          "tree_id": "3626a627508d005ed3fa0379344b3739ed6483cc",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/6ca9aa6b1c41d10d589bbd84d157420672a42301"
        },
        "date": 1767853827005,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 802885,
            "range": "± 16521",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 891200,
            "range": "± 21239",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 970462,
            "range": "± 10909",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 64176288,
            "range": "± 2155582",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 2309168,
            "range": "± 335802",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 3893759,
            "range": "± 16647",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 956083,
            "range": "± 8015",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 61125887,
            "range": "± 2138294",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 2358571,
            "range": "± 19394",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 932590,
            "range": "± 17806",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 956103,
            "range": "± 3775",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 62014959,
            "range": "± 3074336",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4214104,
            "range": "± 75972",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 4182314,
            "range": "± 90970",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 4131740,
            "range": "± 29188",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 2038436,
            "range": "± 59384",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1769244,
            "range": "± 6425",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 2003882,
            "range": "± 11165",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 587620,
            "range": "± 2339",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 661986,
            "range": "± 2640",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 1189296,
            "range": "± 6962",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 3038468,
            "range": "± 15022",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2528895,
            "range": "± 21359",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2769491,
            "range": "± 17991",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 800219,
            "range": "± 4095",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 890951,
            "range": "± 3373",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 1163254,
            "range": "± 17014",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2526171,
            "range": "± 9115",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 2168928,
            "range": "± 16892",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 2354698,
            "range": "± 13904",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 591,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 549,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 28870,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4930,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 4877,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 247597,
            "range": "± 388",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 575374,
            "range": "± 764",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 313434,
            "range": "± 903",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 9496939,
            "range": "± 1131927",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 802197,
            "range": "± 8754",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 948496,
            "range": "± 8212",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 61992086,
            "range": "± 3755044",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 52469,
            "range": "± 185",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 71782,
            "range": "± 380",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 71313,
            "range": "± 4442",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 52448,
            "range": "± 215",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 71945,
            "range": "± 598",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 71850,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 52710,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 70742,
            "range": "± 281",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 70543,
            "range": "± 124",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 78779,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 61875,
            "range": "± 610",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 66718,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 60842,
            "range": "± 780",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 60271,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 64086,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 53808,
            "range": "± 463",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 58436,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 63788,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 312904,
            "range": "± 2539",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 264852,
            "range": "± 1889",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 264618,
            "range": "± 4619",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 351045,
            "range": "± 2516",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 313986,
            "range": "± 994",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 305204,
            "range": "± 1995",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 190450,
            "range": "± 1203",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 184603,
            "range": "± 704",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 158852,
            "range": "± 3922",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 76510,
            "range": "± 991",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 101589,
            "range": "± 765",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 65229,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 54787,
            "range": "± 340",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 68440,
            "range": "± 138",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 65162,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 54072,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 62627,
            "range": "± 3236",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 65141,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 708,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 534,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 409,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 21277,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7044,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5357,
            "range": "± 21",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5246,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 221203,
            "range": "± 963",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 79452,
            "range": "± 281",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 62573,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 67301,
            "range": "± 239",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2390366,
            "range": "± 4382",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 864874,
            "range": "± 2645",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 714788,
            "range": "± 11416",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 908035,
            "range": "± 8200",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 38457880,
            "range": "± 1702310",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5540268,
            "range": "± 122446",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 5938119,
            "range": "± 311600",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 27155798,
            "range": "± 998565",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 6348059,
            "range": "± 112032",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 6408218,
            "range": "± 79767",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 28576533,
            "range": "± 1113969",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2597672,
            "range": "± 215977",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 912855,
            "range": "± 6054",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 52111524,
            "range": "± 7885608",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4799830,
            "range": "± 59135",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4905764,
            "range": "± 115949",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2428343,
            "range": "± 24149",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 257957,
            "range": "± 1791",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 530836,
            "range": "± 2187",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 321927,
            "range": "± 1013",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/mid_duplicate",
            "value": 127018,
            "range": "± 938",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 265244,
            "range": "± 393",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 162190,
            "range": "± 2513",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 258253,
            "range": "± 1614",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 531078,
            "range": "± 1701",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 322050,
            "range": "± 934",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 169,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 522,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 308,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1460,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4136,
            "range": "± 69",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 2384,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 62734,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 132808,
            "range": "± 649",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 81267,
            "range": "± 1173",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 251224,
            "range": "± 1306",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 530445,
            "range": "± 2749",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 321640,
            "range": "± 859",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 238993,
            "range": "± 744",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 506381,
            "range": "± 2123",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 221603,
            "range": "± 449",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 456238,
            "range": "± 3185",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 4092104,
            "range": "± 129288",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 5195995,
            "range": "± 198755",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 26513799,
            "range": "± 565172",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 4032297,
            "range": "± 127274",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4912857,
            "range": "± 77290",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 26902429,
            "range": "± 736495",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 2741460,
            "range": "± 27315",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 3002759,
            "range": "± 36207",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 89184307,
            "range": "± 6456011",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 1650,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 15724,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 12897,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 130686,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 846099,
            "range": "± 4117",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 4695137,
            "range": "± 11876",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 4057865,
            "range": "± 120261",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 28501955,
            "range": "± 400462",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 885731,
            "range": "± 10322",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 956688,
            "range": "± 7650",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 169919,
            "range": "± 6012",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 174379,
            "range": "± 14939",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 24006,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 95656,
            "range": "± 205",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 9243,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 88613,
            "range": "± 1907",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 185556,
            "range": "± 602",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 788567,
            "range": "± 2578",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2166,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 738899,
            "range": "± 1826",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 514834,
            "range": "± 4635",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 658274,
            "range": "± 937",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 520202,
            "range": "± 1926",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 660097,
            "range": "± 2342",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 582944,
            "range": "± 1830",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 674891,
            "range": "± 3375",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 308320,
            "range": "± 6704",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 455104,
            "range": "± 1053",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 136169,
            "range": "± 13777",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 108642,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 1995,
            "range": "± 96",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 1974,
            "range": "± 69",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 68172,
            "range": "± 839",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 80929,
            "range": "± 554",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 878206,
            "range": "± 5441",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 957387,
            "range": "± 5283",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9264596,
            "range": "± 95464",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9948114,
            "range": "± 73232",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6865423,
            "range": "± 99855",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6780194,
            "range": "± 78836",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 76348861,
            "range": "± 2114547",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 7659385,
            "range": "± 292829",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 7010831,
            "range": "± 39813",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 76365102,
            "range": "± 2125424",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 4832718,
            "range": "± 104015",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 3230490,
            "range": "± 33106",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 78988227,
            "range": "± 6467971",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4893703,
            "range": "± 39585",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4937615,
            "range": "± 39255",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1213319,
            "range": "± 19066",
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
          "id": "ce10ffc1783aa7445d9e42d516269f02012f7229",
          "message": "feat: Add bench-compare tool for PR benchmark hypothesis testing (#38)\n\n* feat: Add bench-compare tool for PR benchmark hypothesis testing\n\nIntroduces a new crate that enables A/B comparison of benchmarks between\ngit refs with statistical hypothesis testing. Features:\n\n- Builds benchmark binaries for baseline and test refs\n- Runs benchmarks and collects Criterion output\n- Performs Welch's t-test to detect statistically significant changes\n- Reports results with p-values and percent change\n- JSON output for CI integration\n- Configurable significance level and effect size threshold\n\n* fix: Improve benchmark binary detection and Criterion output parsing\n\n- Fix parser to handle Criterion's multi-line output format where\n  benchmark names appear on a separate line from timing data\n- Add debug output for binary copying and benchmark execution\n- Display count of copied binaries and parsed results\n\n* style: Fix formatting and clippy warnings in bench-compare\n\n- Apply rustfmt formatting\n- Fix clippy print_literal warning by inlining string literal\n\n* docs: Add README for bench-compare tool\n\n- Add comprehensive README with usage examples, options, and CI integration guide\n- Add brief mention in main README under new Tools section\n\n---------\n\nCo-authored-by: Claude <noreply@anthropic.com>",
          "timestamp": "2026-01-11T13:50:15-08:00",
          "tree_id": "fa6b83474c770dbc54da3ef827731f106c235bf2",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/ce10ffc1783aa7445d9e42d516269f02012f7229"
        },
        "date": 1768170552206,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/sosorted/all_unique",
            "value": 936252,
            "range": "± 3137",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/all_unique",
            "value": 962503,
            "range": "± 1938",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/all_unique",
            "value": 1091119,
            "range": "± 2712",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/all_unique",
            "value": 46750869,
            "range": "± 2427436",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/some_duplicates",
            "value": 1998002,
            "range": "± 7427",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/some_duplicates",
            "value": 2803887,
            "range": "± 2857",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/some_duplicates",
            "value": 1194687,
            "range": "± 5998",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/some_duplicates",
            "value": 47342600,
            "range": "± 2366902",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/sosorted/no_unique",
            "value": 1964431,
            "range": "± 11890",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/naive/no_unique",
            "value": 2534637,
            "range": "± 1747",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/std_dedup/no_unique",
            "value": 1182309,
            "range": "± 11806",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/hashset/no_unique",
            "value": 47233551,
            "range": "± 2525116",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_50pct_unique",
            "value": 4216192,
            "range": "± 9095",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_50pct_unique",
            "value": 4125677,
            "range": "± 23607",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_50pct_unique",
            "value": 4355452,
            "range": "± 6768",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/scattered_10pct_unique",
            "value": 2101486,
            "range": "± 35764",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/scattered_10pct_unique",
            "value": 1788559,
            "range": "± 6752",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/scattered_10pct_unique",
            "value": 1959828,
            "range": "± 15084",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/zipf",
            "value": 698581,
            "range": "± 21785",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/zipf",
            "value": 744434,
            "range": "± 1964",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/zipf",
            "value": 1174914,
            "range": "± 6955",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/small_runs",
            "value": 3074267,
            "range": "± 10694",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/small_runs",
            "value": 2558028,
            "range": "± 5158",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/small_runs",
            "value": 2792504,
            "range": "± 16671",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/clustered",
            "value": 913936,
            "range": "± 2514",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/clustered",
            "value": 1007414,
            "range": "± 3998",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/clustered",
            "value": 1249146,
            "range": "± 2974",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/sosorted/database_ids",
            "value": 2538390,
            "range": "± 5274",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/naive/database_ids",
            "value": 2189394,
            "range": "± 20199",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_realistic/std_dedup/database_ids",
            "value": 2371721,
            "range": "± 10137",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1024",
            "value": 479,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1024",
            "value": 514,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1024",
            "value": 28658,
            "range": "± 244",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/8192",
            "value": 4629,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/8192",
            "value": 4866,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/8192",
            "value": 246764,
            "range": "± 561",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/262144",
            "value": 518928,
            "range": "± 1114",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/262144",
            "value": 310947,
            "range": "± 741",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/262144",
            "value": 9502314,
            "range": "± 35694",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/sosorted/1048576",
            "value": 2256692,
            "range": "± 2513",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/std_dedup/1048576",
            "value": 1244582,
            "range": "± 2818",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_scaling/hashset/1048576",
            "value": 47145618,
            "range": "± 2064834",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/0%_dupes",
            "value": 57871,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/0%_dupes",
            "value": 74481,
            "range": "± 218",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/0%_dupes",
            "value": 74502,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/1%_dupes",
            "value": 55990,
            "range": "± 284",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/1%_dupes",
            "value": 74392,
            "range": "± 236",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/1%_dupes",
            "value": 76299,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/10%_dupes",
            "value": 55246,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/10%_dupes",
            "value": 72537,
            "range": "± 2597",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/10%_dupes",
            "value": 74991,
            "range": "± 374",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/50%_dupes",
            "value": 80524,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/50%_dupes",
            "value": 64750,
            "range": "± 338",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/50%_dupes",
            "value": 70383,
            "range": "± 457",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/90%_dupes",
            "value": 63573,
            "range": "± 456",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/90%_dupes",
            "value": 63339,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/90%_dupes",
            "value": 65002,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/sosorted/99%_dupes",
            "value": 55735,
            "range": "± 177",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/naive/99%_dupes",
            "value": 59883,
            "range": "± 239",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_duplicate_density/std_dedup/99%_dupes",
            "value": 64692,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/no_runs",
            "value": 311038,
            "range": "± 2336",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/no_runs",
            "value": 268822,
            "range": "± 1647",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/no_runs",
            "value": 267262,
            "range": "± 1870",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/pairs",
            "value": 351182,
            "range": "± 3696",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/pairs",
            "value": 314251,
            "range": "± 987",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/pairs",
            "value": 307176,
            "range": "± 1424",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/short_runs",
            "value": 191401,
            "range": "± 1869",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/short_runs",
            "value": 186544,
            "range": "± 536",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/short_runs",
            "value": 160157,
            "range": "± 1260",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/medium_runs",
            "value": 77407,
            "range": "± 352",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/medium_runs",
            "value": 104133,
            "range": "± 367",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/medium_runs",
            "value": 68079,
            "range": "± 341",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/long_runs",
            "value": 59583,
            "range": "± 997",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/long_runs",
            "value": 71420,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/long_runs",
            "value": 68298,
            "range": "± 187",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/sosorted/very_long",
            "value": 59951,
            "range": "± 557",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/naive/very_long",
            "value": 63545,
            "range": "± 175",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_run_length/std_dedup/very_long",
            "value": 67046,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000",
            "value": 712,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000",
            "value": 541,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000",
            "value": 413,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000",
            "value": 21186,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/10000",
            "value": 7030,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/10000",
            "value": 5347,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/10000",
            "value": 5257,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/10000",
            "value": 220901,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/100000",
            "value": 79796,
            "range": "± 263",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/100000",
            "value": 63403,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/100000",
            "value": 68772,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/100000",
            "value": 2392607,
            "range": "± 4303",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/sosorted/1000000",
            "value": 891564,
            "range": "± 4536",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/naive/1000000",
            "value": 797742,
            "range": "± 1807",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/std_dedup/1000000",
            "value": 1039895,
            "range": "± 3844",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate_algorithm_comparison/hashset/1000000",
            "value": 30472677,
            "range": "± 940059",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/no_overlap",
            "value": 5340095,
            "range": "± 73031",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/no_overlap",
            "value": 5666371,
            "range": "± 51173",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/no_overlap",
            "value": 22566137,
            "range": "± 1010456",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/sparse_overlap",
            "value": 6143631,
            "range": "± 54132",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/sparse_overlap",
            "value": 6117287,
            "range": "± 67662",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/sparse_overlap",
            "value": 23969170,
            "range": "± 823742",
            "unit": "ns/iter"
          },
          {
            "name": "difference/sosorted/complete_overlap",
            "value": 2547785,
            "range": "± 15988",
            "unit": "ns/iter"
          },
          {
            "name": "difference/naive/complete_overlap",
            "value": 910888,
            "range": "± 2359",
            "unit": "ns/iter"
          },
          {
            "name": "difference/hashset/complete_overlap",
            "value": 31524809,
            "range": "± 1406076",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/no_overlap",
            "value": 4774455,
            "range": "± 28445",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/sparse_overlap",
            "value": 4693799,
            "range": "± 47845",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/sosorted/complete_overlap",
            "value": 2434814,
            "range": "± 50320",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_unique",
            "value": 280068,
            "range": "± 2130",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_unique",
            "value": 530721,
            "range": "± 1860",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_unique",
            "value": 498230,
            "range": "± 2664",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/early_duplicate",
            "value": 4,
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
            "value": 140003,
            "range": "± 662",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/mid_duplicate",
            "value": 265363,
            "range": "± 1068",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/mid_duplicate",
            "value": 249028,
            "range": "± 387",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/sosorted/all_duplicates",
            "value": 315156,
            "range": "± 470",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/naive/all_duplicates",
            "value": 538726,
            "range": "± 1555",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/windows/all_duplicates",
            "value": 498089,
            "range": "± 939",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1024",
            "value": 176,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1024",
            "value": 522,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1024",
            "value": 453,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/8192",
            "value": 1463,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/8192",
            "value": 4133,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/8192",
            "value": 3547,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/262144",
            "value": 77805,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/262144",
            "value": 133017,
            "range": "± 454",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/262144",
            "value": 119231,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/sosorted/1048576",
            "value": 315903,
            "range": "± 428",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/naive/1048576",
            "value": 538627,
            "range": "± 1395",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate_scaling/windows/1048576",
            "value": 498130,
            "range": "± 1228",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/scattered_duplicates",
            "value": 300790,
            "range": "± 991",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/scattered_duplicates",
            "value": 513638,
            "range": "± 1564",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/sosorted/long_unique_run",
            "value": 270701,
            "range": "± 1010",
            "unit": "ns/iter"
          },
          {
            "name": "database_ids/naive/long_unique_run",
            "value": 462343,
            "range": "± 2405",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/no_intersections",
            "value": 3944920,
            "range": "± 15419",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/no_intersections",
            "value": 4852671,
            "range": "± 13206",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/no_intersections",
            "value": 22092634,
            "range": "± 912732",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/sparse_intersections",
            "value": 3900831,
            "range": "± 16437",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/sparse_intersections",
            "value": 4835465,
            "range": "± 20445",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/sparse_intersections",
            "value": 24538585,
            "range": "± 830345",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/sosorted/all_intersections",
            "value": 2839464,
            "range": "± 2248",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/naive/all_intersections",
            "value": 3100205,
            "range": "± 2917",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/hashset/all_intersections",
            "value": 68056376,
            "range": "± 6224668",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1024",
            "value": 1644,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1024",
            "value": 15437,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/8192",
            "value": 12894,
            "range": "± 184",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/8192",
            "value": 130290,
            "range": "± 184",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/262144",
            "value": 854842,
            "range": "± 2610",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/262144",
            "value": 4880203,
            "range": "± 97834",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/sosorted/1048576",
            "value": 3910273,
            "range": "± 24995",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_scaling/hashset/1048576",
            "value": 23493605,
            "range": "± 892752",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1:1",
            "value": 879228,
            "range": "± 7111",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1:1",
            "value": 961122,
            "range": "± 2844",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10:1",
            "value": 168508,
            "range": "± 2404",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10:1",
            "value": 173909,
            "range": "± 2091",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/50:1",
            "value": 24235,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/50:1",
            "value": 95574,
            "range": "± 380",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/100:1",
            "value": 9460,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/100:1",
            "value": 88364,
            "range": "± 670",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/1000:1",
            "value": 204167,
            "range": "± 496",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/1000:1",
            "value": 787890,
            "range": "± 1752",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/sosorted/10000:1",
            "value": 2169,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "lemire_asymmetric/naive/10000:1",
            "value": 739221,
            "range": "± 1575",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/0%",
            "value": 513649,
            "range": "± 1210",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/0%",
            "value": 660427,
            "range": "± 1004",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/1%",
            "value": 523221,
            "range": "± 2370",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/1%",
            "value": 662847,
            "range": "± 2938",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/10%",
            "value": 584889,
            "range": "± 2404",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/10%",
            "value": 675934,
            "range": "± 2033",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/50%",
            "value": 313351,
            "range": "± 6860",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/50%",
            "value": 457902,
            "range": "± 1054",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/sosorted/100%",
            "value": 112657,
            "range": "± 2783",
            "unit": "ns/iter"
          },
          {
            "name": "intersection_density/naive/100%",
            "value": 113251,
            "range": "± 689",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000",
            "value": 1861,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000",
            "value": 1976,
            "range": "± 44",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/10000",
            "value": 68516,
            "range": "± 887",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/10000",
            "value": 80798,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/100000",
            "value": 887302,
            "range": "± 8291",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/100000",
            "value": 960966,
            "range": "± 1379",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/sosorted/1000000",
            "value": 9008134,
            "range": "± 51434",
            "unit": "ns/iter"
          },
          {
            "name": "algorithm_comparison/naive/1000000",
            "value": 9729975,
            "range": "± 16166",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/no_overlap",
            "value": 6624929,
            "range": "± 73449",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/no_overlap",
            "value": 6549319,
            "range": "± 45065",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/no_overlap",
            "value": 70616347,
            "range": "± 1484701",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/sparse_overlap",
            "value": 7483530,
            "range": "± 46468",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/sparse_overlap",
            "value": 6846484,
            "range": "± 51941",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/sparse_overlap",
            "value": 71155883,
            "range": "± 1380836",
            "unit": "ns/iter"
          },
          {
            "name": "union/sosorted/complete_overlap",
            "value": 4260926,
            "range": "± 15815",
            "unit": "ns/iter"
          },
          {
            "name": "union/naive/complete_overlap",
            "value": 2862478,
            "range": "± 5453",
            "unit": "ns/iter"
          },
          {
            "name": "union/hashset/complete_overlap",
            "value": 60453644,
            "range": "± 3267737",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/no_overlap",
            "value": 4890945,
            "range": "± 21414",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/sparse_overlap",
            "value": 4894994,
            "range": "± 28337",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/sosorted/complete_overlap",
            "value": 1212948,
            "range": "± 9314",
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
          "id": "ea67eccc78a3105f81998fbe82f7f7346f701a59",
          "message": "refactor: Restructure benchmarks with consistent naming and shared datasets (#39)\n\n* refactor: Restructure benchmarks with consistent naming and shared datasets\n\nIntroduces a new benchmark organization structure with:\n- Consistent naming pattern: <operation>/<dataset_group>/<implementation>/<dataset_name>\n- Shared datasets via new benches/common/ module for better consistency\n- Separate data generation for unary vs binary operations\n- Operations can still define custom datasets when needed\n\nNew benchmark naming examples:\n- deduplicate/basic/sosorted/all_unique\n- difference/asymmetric/sosorted/10:1\n- intersect/overlap/hashset/100pct\n\nThis restructuring reduces code duplication (1895 lines removed, 1299 added)\nwhile providing a clearer, more maintainable benchmark organization that makes\nit easier to compare implementations across operations and dataset types.\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n* refactor: Keep baseline implementations alongside benchmark definitions\n\nMove baseline implementations (naive_*, hashset_*, windows_*) back into\ntheir respective benchmark files instead of a shared baselines.rs.\nThis keeps related code together and avoids grouping implementations\nfor unrelated operations.\n\nCo-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: Claude Opus 4.5 <noreply@anthropic.com>",
          "timestamp": "2026-01-11T14:11:36-08:00",
          "tree_id": "8c86ae2f12953c9839ee6c883dfe4d8579b814a6",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/ea67eccc78a3105f81998fbe82f7f7346f701a59"
        },
        "date": 1768173912112,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/basic/sosorted/all_unique",
            "value": 569817,
            "range": "± 6941",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_unique",
            "value": 780757,
            "range": "± 5637",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_unique",
            "value": 877854,
            "range": "± 14591",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_unique",
            "value": 67061329,
            "range": "± 3070927",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/early_dup",
            "value": 535325,
            "range": "± 3017",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/early_dup",
            "value": 809771,
            "range": "± 2952",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/early_dup",
            "value": 739697,
            "range": "± 4677",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/early_dup",
            "value": 68343926,
            "range": "± 3711774",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/mid_dup",
            "value": 536760,
            "range": "± 2570",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/mid_dup",
            "value": 780951,
            "range": "± 3964",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/mid_dup",
            "value": 773315,
            "range": "± 3898",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/mid_dup",
            "value": 66526304,
            "range": "± 3164395",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/late_dup",
            "value": 538925,
            "range": "± 11089",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/late_dup",
            "value": 765389,
            "range": "± 4768",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/late_dup",
            "value": 848709,
            "range": "± 4357",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/late_dup",
            "value": 67314816,
            "range": "± 3756442",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/all_duplicates",
            "value": 521855,
            "range": "± 2880",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_duplicates",
            "value": 765589,
            "range": "± 5032",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_duplicates",
            "value": 942047,
            "range": "± 4427",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_duplicates",
            "value": 67199370,
            "range": "± 3160884",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/0pct",
            "value": 556724,
            "range": "± 3374",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/0pct",
            "value": 801338,
            "range": "± 4735",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/0pct",
            "value": 942144,
            "range": "± 3749",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/0pct",
            "value": 66915520,
            "range": "± 3742026",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/1pct",
            "value": 520333,
            "range": "± 3951",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/1pct",
            "value": 761208,
            "range": "± 2446",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/1pct",
            "value": 936155,
            "range": "± 5439",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/1pct",
            "value": 64438772,
            "range": "± 2460405",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/10pct",
            "value": 538769,
            "range": "± 3622",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/10pct",
            "value": 732630,
            "range": "± 2444",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/10pct",
            "value": 905716,
            "range": "± 3162",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/10pct",
            "value": 61674369,
            "range": "± 3439486",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/50pct",
            "value": 854447,
            "range": "± 6257",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/50pct",
            "value": 1926224,
            "range": "± 91488",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/50pct",
            "value": 621840,
            "range": "± 3160",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/50pct",
            "value": 48034774,
            "range": "± 5041563",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/90pct",
            "value": 486220,
            "range": "± 2230",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/90pct",
            "value": 469304,
            "range": "± 2484",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/90pct",
            "value": 561610,
            "range": "± 6468",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/90pct",
            "value": 30861431,
            "range": "± 1545449",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/99pct",
            "value": 367590,
            "range": "± 3735",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/99pct",
            "value": 510640,
            "range": "± 3353",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/99pct",
            "value": 502339,
            "range": "± 1924",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/99pct",
            "value": 22916038,
            "range": "± 160421",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/1",
            "value": 521705,
            "range": "± 4749",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/1",
            "value": 764855,
            "range": "± 3552",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/1",
            "value": 868767,
            "range": "± 3207",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/1",
            "value": 69546322,
            "range": "± 4544793",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/2",
            "value": 4158751,
            "range": "± 9466",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/2",
            "value": 3189778,
            "range": "± 10638",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/2",
            "value": 3485979,
            "range": "± 15518",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/2",
            "value": 52468896,
            "range": "± 4010358",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/4",
            "value": 2230557,
            "range": "± 8553",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/4",
            "value": 1820750,
            "range": "± 12462",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/4",
            "value": 1899848,
            "range": "± 16024",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/4",
            "value": 36263993,
            "range": "± 1874271",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/16",
            "value": 785868,
            "range": "± 3751",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/16",
            "value": 804810,
            "range": "± 4930",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/16",
            "value": 900326,
            "range": "± 3189",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/16",
            "value": 28100839,
            "range": "± 803697",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/64",
            "value": 466442,
            "range": "± 4236",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/64",
            "value": 576421,
            "range": "± 4740",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/64",
            "value": 575950,
            "range": "± 3707",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/64",
            "value": 23827457,
            "range": "± 252899",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/256",
            "value": 403267,
            "range": "± 2287",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/256",
            "value": 464717,
            "range": "± 3174",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/256",
            "value": 530584,
            "range": "± 5064",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/256",
            "value": 21829624,
            "range": "± 70933",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/zipf",
            "value": 356185,
            "range": "± 2853",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/zipf",
            "value": 441432,
            "range": "± 2199",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/zipf",
            "value": 570691,
            "range": "± 36893",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/zipf",
            "value": 20912760,
            "range": "± 381865",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/database_ids",
            "value": 2510498,
            "range": "± 8291",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/database_ids",
            "value": 1802279,
            "range": "± 6860",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/database_ids",
            "value": 1766555,
            "range": "± 9237",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/database_ids",
            "value": 57605747,
            "range": "± 2618518",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/clustered",
            "value": 544734,
            "range": "± 2499",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/clustered",
            "value": 742313,
            "range": "± 3092",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/clustered",
            "value": 706137,
            "range": "± 2485",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/clustered",
            "value": 61035623,
            "range": "± 2109250",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/small_runs",
            "value": 2791455,
            "range": "± 12817",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/small_runs",
            "value": 1974638,
            "range": "± 15603",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/small_runs",
            "value": 2106699,
            "range": "± 14242",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/small_runs",
            "value": 36237867,
            "range": "± 1560100",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1K",
            "value": 864,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1K",
            "value": 636,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1K",
            "value": 580,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1K",
            "value": 28722,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/10K",
            "value": 7956,
            "range": "± 39",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/10K",
            "value": 5771,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/10K",
            "value": 5684,
            "range": "± 49",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/10K",
            "value": 302452,
            "range": "± 607",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/100K",
            "value": 81254,
            "range": "± 583",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/100K",
            "value": 153740,
            "range": "± 5022",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/100K",
            "value": 59245,
            "range": "± 281",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/100K",
            "value": 3314126,
            "range": "± 7930",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1M",
            "value": 811841,
            "range": "± 8815",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1M",
            "value": 1755508,
            "range": "± 65278",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1M",
            "value": 664006,
            "range": "± 4006",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1M",
            "value": 41171518,
            "range": "± 2720103",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/50pct_unique",
            "value": 4332181,
            "range": "± 17950",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/50pct_unique",
            "value": 3574166,
            "range": "± 18915",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/50pct_unique",
            "value": 3986632,
            "range": "± 15691",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/10pct_unique",
            "value": 1654531,
            "range": "± 10200",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/10pct_unique",
            "value": 1212846,
            "range": "± 10368",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/10pct_unique",
            "value": 1358603,
            "range": "± 5507",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/zipf",
            "value": 363734,
            "range": "± 2156",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/zipf",
            "value": 448998,
            "range": "± 5070",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/zipf",
            "value": 507908,
            "range": "± 3610",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/small_runs",
            "value": 2791270,
            "range": "± 11132",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/small_runs",
            "value": 1974565,
            "range": "± 17845",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/small_runs",
            "value": 2099547,
            "range": "± 17909",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/clustered",
            "value": 529081,
            "range": "± 3145",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/clustered",
            "value": 756737,
            "range": "± 3345",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/clustered",
            "value": 707843,
            "range": "± 2462",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/database_ids",
            "value": 2509505,
            "range": "± 6668",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/database_ids",
            "value": 1792985,
            "range": "± 20059",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/database_ids",
            "value": 1697998,
            "range": "± 19875",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/0pct",
            "value": 5139439,
            "range": "± 76919",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/0pct",
            "value": 5179615,
            "range": "± 15848",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/0pct",
            "value": 24174436,
            "range": "± 996157",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/1pct",
            "value": 5121501,
            "range": "± 30754",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/1pct",
            "value": 5182226,
            "range": "± 22752",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/1pct",
            "value": 24234032,
            "range": "± 730662",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/10pct",
            "value": 4823701,
            "range": "± 391717",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/10pct",
            "value": 5175851,
            "range": "± 9112",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/10pct",
            "value": 27089416,
            "range": "± 1807218",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/50pct",
            "value": 3858031,
            "range": "± 29382",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/50pct",
            "value": 4936335,
            "range": "± 16096",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/50pct",
            "value": 28710954,
            "range": "± 4004204",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/100pct",
            "value": 2965241,
            "range": "± 22348",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/100pct",
            "value": 692698,
            "range": "± 2332",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/100pct",
            "value": 27767745,
            "range": "± 2217602",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1:1",
            "value": 12359422,
            "range": "± 38769",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1:1",
            "value": 11622309,
            "range": "± 13434",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1:1",
            "value": 31872353,
            "range": "± 1532284",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/10:1",
            "value": 3251471,
            "range": "± 12847",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/10:1",
            "value": 2539922,
            "range": "± 8262",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/10:1",
            "value": 26331385,
            "range": "± 92240",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/50:1",
            "value": 2002395,
            "range": "± 17792",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/50:1",
            "value": 1730524,
            "range": "± 3901",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/50:1",
            "value": 20069340,
            "range": "± 33956",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/100:1",
            "value": 1810560,
            "range": "± 8991",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/100:1",
            "value": 1626358,
            "range": "± 5910",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/100:1",
            "value": 19800557,
            "range": "± 41376",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1000:1",
            "value": 1638462,
            "range": "± 15141",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1000:1",
            "value": 1519907,
            "range": "± 18104",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1000:1",
            "value": 18877876,
            "range": "± 26662",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1K",
            "value": 2968,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1K",
            "value": 2852,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1K",
            "value": 18934,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/10K",
            "value": 30260,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/10K",
            "value": 73792,
            "range": "± 305",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/10K",
            "value": 208069,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/100K",
            "value": 1144351,
            "range": "± 5678",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/100K",
            "value": 1098472,
            "range": "± 3615",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/100K",
            "value": 2689745,
            "range": "± 28445",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1M",
            "value": 11764286,
            "range": "± 24230",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1M",
            "value": 11076920,
            "range": "± 19257",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1M",
            "value": 30519400,
            "range": "± 1571318",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/0pct",
            "value": 4615193,
            "range": "± 15161",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/1pct",
            "value": 4598042,
            "range": "± 25075",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/10pct",
            "value": 4309532,
            "range": "± 12613",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/50pct",
            "value": 3406272,
            "range": "± 9459",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/100pct",
            "value": 2786575,
            "range": "± 12369",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1:1",
            "value": 12074766,
            "range": "± 13071",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/10:1",
            "value": 2909683,
            "range": "± 2713",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/50:1",
            "value": 1574583,
            "range": "± 16363",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/100:1",
            "value": 1385194,
            "range": "± 8032",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1000:1",
            "value": 1198425,
            "range": "± 15731",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1K",
            "value": 2607,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/10K",
            "value": 27270,
            "range": "± 382",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/100K",
            "value": 1118125,
            "range": "± 7984",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1M",
            "value": 11506397,
            "range": "± 17572",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_unique",
            "value": 166961,
            "range": "± 1744",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_unique",
            "value": 544222,
            "range": "± 1537",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_unique",
            "value": 327950,
            "range": "± 1767",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/early_dup",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/early_dup",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/early_dup",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/mid_dup",
            "value": 83729,
            "range": "± 812",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/mid_dup",
            "value": 272533,
            "range": "± 2163",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/mid_dup",
            "value": 164116,
            "range": "± 808",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/late_dup",
            "value": 152997,
            "range": "± 2035",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/late_dup",
            "value": 489762,
            "range": "± 4272",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/late_dup",
            "value": 295489,
            "range": "± 1769",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_duplicates",
            "value": 166804,
            "range": "± 872",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_duplicates",
            "value": 544132,
            "range": "± 3054",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_duplicates",
            "value": 328149,
            "range": "± 1624",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/0pct",
            "value": 154194,
            "range": "± 5808",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/0pct",
            "value": 545229,
            "range": "± 1943",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/0pct",
            "value": 328369,
            "range": "± 1877",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/1pct",
            "value": 146228,
            "range": "± 1197",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/1pct",
            "value": 540156,
            "range": "± 1728",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/1pct",
            "value": 324818,
            "range": "± 1392",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/10pct",
            "value": 132994,
            "range": "± 855",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/10pct",
            "value": 490917,
            "range": "± 4393",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/10pct",
            "value": 295776,
            "range": "± 1274",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/50pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/90pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/99pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/1",
            "value": 151574,
            "range": "± 1560",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/1",
            "value": 545268,
            "range": "± 3641",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/1",
            "value": 327983,
            "range": "± 1496",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/2",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/2",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/4",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/64",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/256",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/zipf",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/database_ids",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/database_ids",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/database_ids",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/clustered",
            "value": 12563,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/clustered",
            "value": 45438,
            "range": "± 263",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/clustered",
            "value": 26948,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/small_runs",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/small_runs",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/small_runs",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/10K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/100K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1M",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/scattered",
            "value": 152174,
            "range": "± 2695",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/scattered",
            "value": 545510,
            "range": "± 1314",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/long_unique_run",
            "value": 132713,
            "range": "± 589",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/long_unique_run",
            "value": 490356,
            "range": "± 4620",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/0pct",
            "value": 3594161,
            "range": "± 36662",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/0pct",
            "value": 4252805,
            "range": "± 44251",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/0pct",
            "value": 23566625,
            "range": "± 631651",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/1pct",
            "value": 3564328,
            "range": "± 38750",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/1pct",
            "value": 4242496,
            "range": "± 33682",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/1pct",
            "value": 24072728,
            "range": "± 684830",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/10pct",
            "value": 3542794,
            "range": "± 35880",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/10pct",
            "value": 4218520,
            "range": "± 79750",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/10pct",
            "value": 32658690,
            "range": "± 1418736",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/50pct",
            "value": 3342434,
            "range": "± 16629",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/50pct",
            "value": 4135756,
            "range": "± 26831",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/50pct",
            "value": 56579739,
            "range": "± 3538642",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/100pct",
            "value": 1101914,
            "range": "± 11448",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/100pct",
            "value": 1460762,
            "range": "± 8065",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/100pct",
            "value": 58686339,
            "range": "± 3792388",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1:1",
            "value": 8813456,
            "range": "± 25201",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1:1",
            "value": 10149070,
            "range": "± 34059",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1:1",
            "value": 35621325,
            "range": "± 2977528",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/10:1",
            "value": 1840713,
            "range": "± 4377",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/10:1",
            "value": 1852335,
            "range": "± 8890",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/10:1",
            "value": 2938471,
            "range": "± 8769",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/50:1",
            "value": 504907,
            "range": "± 1092",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/50:1",
            "value": 1099501,
            "range": "± 8234",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/50:1",
            "value": 575985,
            "range": "± 1657",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/100:1",
            "value": 268625,
            "range": "± 694",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/100:1",
            "value": 937021,
            "range": "± 24836",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/100:1",
            "value": 277444,
            "range": "± 1422",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1000:1",
            "value": 94234,
            "range": "± 377",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1000:1",
            "value": 759894,
            "range": "± 6378",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1000:1",
            "value": 20296,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1K",
            "value": 2084,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1K",
            "value": 2501,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1K",
            "value": 19320,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/10K",
            "value": 19031,
            "range": "± 882",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/10K",
            "value": 65446,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/10K",
            "value": 228087,
            "range": "± 1035",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/100K",
            "value": 819116,
            "range": "± 1204",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/100K",
            "value": 951444,
            "range": "± 2259",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/100K",
            "value": 2942066,
            "range": "± 4622",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1M",
            "value": 8442233,
            "range": "± 30826",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1M",
            "value": 9622691,
            "range": "± 30135",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1M",
            "value": 33621221,
            "range": "± 1609603",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/0pct",
            "value": 429982,
            "range": "± 1274",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/0pct",
            "value": 540488,
            "range": "± 1601",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/1pct",
            "value": 435273,
            "range": "± 648",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/1pct",
            "value": 606777,
            "range": "± 1109",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/10pct",
            "value": 478190,
            "range": "± 803",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/10pct",
            "value": 583146,
            "range": "± 2778",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/50pct",
            "value": 265050,
            "range": "± 606",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/50pct",
            "value": 331488,
            "range": "± 542",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/100pct",
            "value": 108684,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/100pct",
            "value": 140184,
            "range": "± 824",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/0pct",
            "value": 6251828,
            "range": "± 99107",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/0pct",
            "value": 6168706,
            "range": "± 12348",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/0pct",
            "value": 78059436,
            "range": "± 837098",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/1pct",
            "value": 6276550,
            "range": "± 38409",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/1pct",
            "value": 6169094,
            "range": "± 13698",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/1pct",
            "value": 79130173,
            "range": "± 802602",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/10pct",
            "value": 5899617,
            "range": "± 59069",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/10pct",
            "value": 6173375,
            "range": "± 12148",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/10pct",
            "value": 81734725,
            "range": "± 1248015",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/50pct",
            "value": 4990381,
            "range": "± 60288",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/50pct",
            "value": 5904631,
            "range": "± 18972",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/50pct",
            "value": 83715489,
            "range": "± 3421759",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/100pct",
            "value": 1915321,
            "range": "± 25092",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/100pct",
            "value": 1971749,
            "range": "± 27475",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/100pct",
            "value": 61345490,
            "range": "± 2892256",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1:1",
            "value": 12710989,
            "range": "± 75167",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1:1",
            "value": 12650352,
            "range": "± 32755",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1:1",
            "value": 81268766,
            "range": "± 1576402",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/10:1",
            "value": 3284261,
            "range": "± 15732",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/10:1",
            "value": 2690331,
            "range": "± 3441",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/10:1",
            "value": 27243357,
            "range": "± 494572",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/50:1",
            "value": 2271405,
            "range": "± 7360",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/50:1",
            "value": 1766512,
            "range": "± 8028",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/50:1",
            "value": 22986309,
            "range": "± 192314",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/100:1",
            "value": 2129478,
            "range": "± 12492",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/100:1",
            "value": 1646847,
            "range": "± 10102",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/100:1",
            "value": 22520368,
            "range": "± 111928",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1000:1",
            "value": 2006567,
            "range": "± 14235",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1000:1",
            "value": 1525215,
            "range": "± 16918",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1000:1",
            "value": 21968050,
            "range": "± 64486",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1K",
            "value": 3458,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1K",
            "value": 3831,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1K",
            "value": 41231,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/10K",
            "value": 64649,
            "range": "± 3546",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/10K",
            "value": 96914,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/10K",
            "value": 505695,
            "range": "± 4083",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/100K",
            "value": 1178487,
            "range": "± 3203",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/100K",
            "value": 1198767,
            "range": "± 10269",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/100K",
            "value": 6190345,
            "range": "± 18632",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1M",
            "value": 12092923,
            "range": "± 68649",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1M",
            "value": 12065257,
            "range": "± 36629",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1M",
            "value": 78688472,
            "range": "± 2197178",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/0pct",
            "value": 4748356,
            "range": "± 9920",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/1pct",
            "value": 4751426,
            "range": "± 9974",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/10pct",
            "value": 4751684,
            "range": "± 65685",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/50pct",
            "value": 4646232,
            "range": "± 28272",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/100pct",
            "value": 1309818,
            "range": "± 7032",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1:1",
            "value": 10239763,
            "range": "± 20594",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/10:1",
            "value": 2211124,
            "range": "± 2547",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/50:1",
            "value": 1413963,
            "range": "± 6191",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/100:1",
            "value": 1310250,
            "range": "± 5076",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1000:1",
            "value": 1204571,
            "range": "± 9717",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1K",
            "value": 2458,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/10K",
            "value": 72841,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/100K",
            "value": 961836,
            "range": "± 1230",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1M",
            "value": 9769165,
            "range": "± 8329",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b51846e06054f667685b299481714a8aa024d1c8",
          "message": "Update docstrings for intersect and union (#34)\n\n- Refine `intersect` documentation to accurately reflect the adaptive algorithm thresholds, including the scalar fallback for small ratios.\n- Add algorithm description to `union` docstring (Hybrid SIMD + scalar merge).\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-11T14:15:28-08:00",
          "tree_id": "8d9f309405d617834cbbb707697b9d1c167239c4",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/b51846e06054f667685b299481714a8aa024d1c8"
        },
        "date": 1768174121912,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/basic/sosorted/all_unique",
            "value": 557933,
            "range": "± 8841",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_unique",
            "value": 766670,
            "range": "± 3998",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_unique",
            "value": 945359,
            "range": "± 15253",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_unique",
            "value": 51990764,
            "range": "± 2480762",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/early_dup",
            "value": 522893,
            "range": "± 23525",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/early_dup",
            "value": 802453,
            "range": "± 34476",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/early_dup",
            "value": 741398,
            "range": "± 5307",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/early_dup",
            "value": 57581145,
            "range": "± 6180565",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/mid_dup",
            "value": 562854,
            "range": "± 17177",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/mid_dup",
            "value": 806747,
            "range": "± 4200",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/mid_dup",
            "value": 845507,
            "range": "± 6654",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/mid_dup",
            "value": 57491485,
            "range": "± 5368883",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/late_dup",
            "value": 561144,
            "range": "± 3640",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/late_dup",
            "value": 803530,
            "range": "± 5105",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/late_dup",
            "value": 849687,
            "range": "± 4884",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/late_dup",
            "value": 52074044,
            "range": "± 2855768",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/all_duplicates",
            "value": 560239,
            "range": "± 3263",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_duplicates",
            "value": 765348,
            "range": "± 3347",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_duplicates",
            "value": 868612,
            "range": "± 16757",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_duplicates",
            "value": 55054711,
            "range": "± 4680217",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/0pct",
            "value": 522308,
            "range": "± 25085",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/0pct",
            "value": 766156,
            "range": "± 2217",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/0pct",
            "value": 872598,
            "range": "± 5476",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/0pct",
            "value": 63027263,
            "range": "± 5261361",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/1pct",
            "value": 561168,
            "range": "± 4184",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/1pct",
            "value": 801701,
            "range": "± 4386",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/1pct",
            "value": 867522,
            "range": "± 3993",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/1pct",
            "value": 61520835,
            "range": "± 5551907",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/10pct",
            "value": 506982,
            "range": "± 3060",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/10pct",
            "value": 731226,
            "range": "± 25011",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/10pct",
            "value": 831866,
            "range": "± 8824",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/10pct",
            "value": 58361448,
            "range": "± 6856183",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/50pct",
            "value": 853607,
            "range": "± 3164",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/50pct",
            "value": 1970693,
            "range": "± 62610",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/50pct",
            "value": 700749,
            "range": "± 5836",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/50pct",
            "value": 37679892,
            "range": "± 2758534",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/90pct",
            "value": 524730,
            "range": "± 3633",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/90pct",
            "value": 506884,
            "range": "± 3851",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/90pct",
            "value": 645517,
            "range": "± 6945",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/90pct",
            "value": 26098423,
            "range": "± 1712520",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/99pct",
            "value": 405296,
            "range": "± 14425",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/99pct",
            "value": 546663,
            "range": "± 4023",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/99pct",
            "value": 586045,
            "range": "± 5467",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/99pct",
            "value": 20576426,
            "range": "± 148963",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/1",
            "value": 559500,
            "range": "± 3388",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/1",
            "value": 766089,
            "range": "± 2523",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/1",
            "value": 869002,
            "range": "± 2751",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/1",
            "value": 52591816,
            "range": "± 3016402",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/2",
            "value": 4176940,
            "range": "± 32264",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/2",
            "value": 3210523,
            "range": "± 13793",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/2",
            "value": 3552196,
            "range": "± 64038",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/2",
            "value": 44377571,
            "range": "± 4282931",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/4",
            "value": 2250586,
            "range": "± 7756",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/4",
            "value": 1851079,
            "range": "± 18345",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/4",
            "value": 1910272,
            "range": "± 9858",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/4",
            "value": 39869313,
            "range": "± 2144742",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/16",
            "value": 827558,
            "range": "± 4236",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/16",
            "value": 804626,
            "range": "± 12368",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/16",
            "value": 903889,
            "range": "± 3182",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/16",
            "value": 25656598,
            "range": "± 698119",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/64",
            "value": 495656,
            "range": "± 14136",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/64",
            "value": 632763,
            "range": "± 9902",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/64",
            "value": 586420,
            "range": "± 6653",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/64",
            "value": 22120580,
            "range": "± 227616",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/256",
            "value": 416288,
            "range": "± 7305",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/256",
            "value": 515023,
            "range": "± 12949",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/256",
            "value": 535207,
            "range": "± 3964",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/256",
            "value": 19938491,
            "range": "± 112125",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/zipf",
            "value": 404685,
            "range": "± 6170",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/zipf",
            "value": 485244,
            "range": "± 4584",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/zipf",
            "value": 585993,
            "range": "± 7327",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/zipf",
            "value": 19360224,
            "range": "± 43172",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/database_ids",
            "value": 2569820,
            "range": "± 26924",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/database_ids",
            "value": 1836725,
            "range": "± 14818",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/database_ids",
            "value": 1790374,
            "range": "± 9035",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/database_ids",
            "value": 65937396,
            "range": "± 2891847",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/clustered",
            "value": 558168,
            "range": "± 6804",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/clustered",
            "value": 790061,
            "range": "± 6013",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/clustered",
            "value": 795051,
            "range": "± 4814",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/clustered",
            "value": 67743296,
            "range": "± 2757812",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/small_runs",
            "value": 2887274,
            "range": "± 32328",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/small_runs",
            "value": 1985213,
            "range": "± 9353",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/small_runs",
            "value": 2170074,
            "range": "± 10347",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/small_runs",
            "value": 35517599,
            "range": "± 1903548",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1K",
            "value": 864,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1K",
            "value": 638,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1K",
            "value": 582,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1K",
            "value": 24440,
            "range": "± 63",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/10K",
            "value": 7973,
            "range": "± 32",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/10K",
            "value": 5771,
            "range": "± 35",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/10K",
            "value": 5685,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/10K",
            "value": 255972,
            "range": "± 1070",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/100K",
            "value": 84167,
            "range": "± 1288",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/100K",
            "value": 200601,
            "range": "± 36398",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/100K",
            "value": 67064,
            "range": "± 456",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/100K",
            "value": 2798835,
            "range": "± 14283",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1M",
            "value": 868618,
            "range": "± 6703",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1M",
            "value": 1946646,
            "range": "± 53532",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1M",
            "value": 676256,
            "range": "± 28890",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1M",
            "value": 54149490,
            "range": "± 3375369",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/50pct_unique",
            "value": 4492035,
            "range": "± 43350",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/50pct_unique",
            "value": 3687582,
            "range": "± 36341",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/50pct_unique",
            "value": 4026502,
            "range": "± 22286",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/10pct_unique",
            "value": 1745970,
            "range": "± 22734",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/10pct_unique",
            "value": 1287508,
            "range": "± 19577",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/10pct_unique",
            "value": 1450177,
            "range": "± 8060",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/zipf",
            "value": 420940,
            "range": "± 9217",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/zipf",
            "value": 502028,
            "range": "± 8012",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/zipf",
            "value": 598318,
            "range": "± 5834",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/small_runs",
            "value": 2957794,
            "range": "± 30226",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/small_runs",
            "value": 2123537,
            "range": "± 30416",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/small_runs",
            "value": 2214687,
            "range": "± 63650",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/clustered",
            "value": 593274,
            "range": "± 7406",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/clustered",
            "value": 808190,
            "range": "± 5653",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/clustered",
            "value": 798524,
            "range": "± 6179",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/database_ids",
            "value": 2583167,
            "range": "± 14031",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/database_ids",
            "value": 1843843,
            "range": "± 12168",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/database_ids",
            "value": 1781381,
            "range": "± 21910",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/0pct",
            "value": 5343716,
            "range": "± 23537",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/0pct",
            "value": 5205550,
            "range": "± 26031",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/0pct",
            "value": 31743072,
            "range": "± 272567",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/1pct",
            "value": 5362480,
            "range": "± 40450",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/1pct",
            "value": 5204482,
            "range": "± 31144",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/1pct",
            "value": 33047904,
            "range": "± 313191",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/10pct",
            "value": 5022769,
            "range": "± 42451",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/10pct",
            "value": 5199437,
            "range": "± 11276",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/10pct",
            "value": 40950236,
            "range": "± 648159",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/50pct",
            "value": 4054975,
            "range": "± 31362",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/50pct",
            "value": 4951825,
            "range": "± 11751",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/50pct",
            "value": 71133998,
            "range": "± 3206431",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/100pct",
            "value": 3166863,
            "range": "± 23826",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/100pct",
            "value": 699903,
            "range": "± 8274",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/100pct",
            "value": 99254932,
            "range": "± 6468825",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1:1",
            "value": 12554818,
            "range": "± 38982",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1:1",
            "value": 11637020,
            "range": "± 18341",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1:1",
            "value": 48161001,
            "range": "± 754505",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/10:1",
            "value": 3355932,
            "range": "± 26691",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/10:1",
            "value": 2558237,
            "range": "± 6191",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/10:1",
            "value": 28982008,
            "range": "± 269325",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/50:1",
            "value": 2064970,
            "range": "± 26611",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/50:1",
            "value": 1744406,
            "range": "± 9160",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/50:1",
            "value": 22388258,
            "range": "± 44779",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/100:1",
            "value": 1884320,
            "range": "± 16768",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/100:1",
            "value": 1640524,
            "range": "± 17260",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/100:1",
            "value": 21665760,
            "range": "± 36275",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1000:1",
            "value": 1704571,
            "range": "± 43689",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1000:1",
            "value": 1532850,
            "range": "± 17477",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1000:1",
            "value": 20711407,
            "range": "± 57905",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1K",
            "value": 2955,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1K",
            "value": 2879,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1K",
            "value": 20798,
            "range": "± 69",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/10K",
            "value": 30348,
            "range": "± 293",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/10K",
            "value": 73684,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/10K",
            "value": 222308,
            "range": "± 4646",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/100K",
            "value": 1153350,
            "range": "± 10447",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/100K",
            "value": 1100096,
            "range": "± 5770",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/100K",
            "value": 2859600,
            "range": "± 83590",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1M",
            "value": 11902564,
            "range": "± 60099",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1M",
            "value": 11083982,
            "range": "± 8221",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1M",
            "value": 42301925,
            "range": "± 1562821",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/0pct",
            "value": 4673168,
            "range": "± 23749",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/1pct",
            "value": 4657026,
            "range": "± 27304",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/10pct",
            "value": 4382031,
            "range": "± 21294",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/50pct",
            "value": 3456412,
            "range": "± 24862",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/100pct",
            "value": 2792985,
            "range": "± 14675",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1:1",
            "value": 12072697,
            "range": "± 17770",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/10:1",
            "value": 2914881,
            "range": "± 7838",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/50:1",
            "value": 1577686,
            "range": "± 26136",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/100:1",
            "value": 1389714,
            "range": "± 23006",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1000:1",
            "value": 1201636,
            "range": "± 18331",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1K",
            "value": 2593,
            "range": "± 29",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/10K",
            "value": 27266,
            "range": "± 201",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/100K",
            "value": 1121407,
            "range": "± 13604",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1M",
            "value": 11510874,
            "range": "± 39356",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_unique",
            "value": 173087,
            "range": "± 1364",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_unique",
            "value": 545813,
            "range": "± 2067",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_unique",
            "value": 331328,
            "range": "± 1333",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/early_dup",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/early_dup",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/early_dup",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/mid_dup",
            "value": 86426,
            "range": "± 632",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/mid_dup",
            "value": 272375,
            "range": "± 6873",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/mid_dup",
            "value": 165802,
            "range": "± 1544",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/late_dup",
            "value": 154435,
            "range": "± 1245",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/late_dup",
            "value": 490167,
            "range": "± 3249",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/late_dup",
            "value": 296240,
            "range": "± 4500",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_duplicates",
            "value": 170092,
            "range": "± 1549",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_duplicates",
            "value": 543744,
            "range": "± 2725",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_duplicates",
            "value": 329063,
            "range": "± 1940",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/0pct",
            "value": 170360,
            "range": "± 892",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/0pct",
            "value": 544231,
            "range": "± 1304",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/0pct",
            "value": 328946,
            "range": "± 1228",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/1pct",
            "value": 155078,
            "range": "± 687",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/1pct",
            "value": 538703,
            "range": "± 4886",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/1pct",
            "value": 326057,
            "range": "± 1297",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/10pct",
            "value": 141275,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/10pct",
            "value": 492035,
            "range": "± 7439",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/10pct",
            "value": 296732,
            "range": "± 1062",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/50pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/90pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/99pct",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/1",
            "value": 169712,
            "range": "± 682",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/1",
            "value": 543346,
            "range": "± 32816",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/1",
            "value": 328782,
            "range": "± 3402",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/2",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/2",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/2",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/4",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/16",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/64",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/256",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/zipf",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/database_ids",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/database_ids",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/database_ids",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/clustered",
            "value": 13927,
            "range": "± 70",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/clustered",
            "value": 45228,
            "range": "± 466",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/clustered",
            "value": 26918,
            "range": "± 88",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/small_runs",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/small_runs",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/small_runs",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/10K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/100K",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1M",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/scattered",
            "value": 170221,
            "range": "± 904",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/scattered",
            "value": 543809,
            "range": "± 1723",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/long_unique_run",
            "value": 141144,
            "range": "± 755",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/long_unique_run",
            "value": 488540,
            "range": "± 4094",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/0pct",
            "value": 3585387,
            "range": "± 32147",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/0pct",
            "value": 4281443,
            "range": "± 33090",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/0pct",
            "value": 24525613,
            "range": "± 609033",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/1pct",
            "value": 3589566,
            "range": "± 38480",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/1pct",
            "value": 4243114,
            "range": "± 31161",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/1pct",
            "value": 24637856,
            "range": "± 905287",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/10pct",
            "value": 3539175,
            "range": "± 32852",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/10pct",
            "value": 4225632,
            "range": "± 29312",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/10pct",
            "value": 32514874,
            "range": "± 1386137",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/50pct",
            "value": 3392943,
            "range": "± 37224",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/50pct",
            "value": 4192905,
            "range": "± 76906",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/50pct",
            "value": 57718458,
            "range": "± 4442446",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/100pct",
            "value": 1141886,
            "range": "± 39878",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/100pct",
            "value": 1453943,
            "range": "± 23207",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/100pct",
            "value": 66761353,
            "range": "± 7323061",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1:1",
            "value": 8852211,
            "range": "± 30556",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1:1",
            "value": 10150238,
            "range": "± 37817",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1:1",
            "value": 37451380,
            "range": "± 2814660",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/10:1",
            "value": 1843171,
            "range": "± 6841",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/10:1",
            "value": 1857501,
            "range": "± 11718",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/10:1",
            "value": 2949230,
            "range": "± 19347",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/50:1",
            "value": 506887,
            "range": "± 1838",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/50:1",
            "value": 1106574,
            "range": "± 26494",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/50:1",
            "value": 577971,
            "range": "± 9326",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/100:1",
            "value": 270304,
            "range": "± 493",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/100:1",
            "value": 940307,
            "range": "± 2545",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/100:1",
            "value": 276618,
            "range": "± 2277",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1000:1",
            "value": 118022,
            "range": "± 2634",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1000:1",
            "value": 761104,
            "range": "± 4933",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1000:1",
            "value": 20118,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1K",
            "value": 2085,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1K",
            "value": 2513,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1K",
            "value": 19186,
            "range": "± 77",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/10K",
            "value": 20912,
            "range": "± 37",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/10K",
            "value": 65251,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/10K",
            "value": 225097,
            "range": "± 627",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/100K",
            "value": 820716,
            "range": "± 5351",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/100K",
            "value": 951694,
            "range": "± 1002",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/100K",
            "value": 2952429,
            "range": "± 5947",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1M",
            "value": 8478528,
            "range": "± 30068",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1M",
            "value": 9711236,
            "range": "± 29841",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1M",
            "value": 36672472,
            "range": "± 1444357",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/0pct",
            "value": 431443,
            "range": "± 928",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/0pct",
            "value": 544337,
            "range": "± 1560",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/1pct",
            "value": 436759,
            "range": "± 14032",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/1pct",
            "value": 610170,
            "range": "± 2405",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/10pct",
            "value": 480214,
            "range": "± 1755",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/10pct",
            "value": 584177,
            "range": "± 1325",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/50pct",
            "value": 266665,
            "range": "± 672",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/50pct",
            "value": 333392,
            "range": "± 1255",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/100pct",
            "value": 108647,
            "range": "± 402",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/100pct",
            "value": 140079,
            "range": "± 1463",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/0pct",
            "value": 6392078,
            "range": "± 44790",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/0pct",
            "value": 6182758,
            "range": "± 9906",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/0pct",
            "value": 71346235,
            "range": "± 733212",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/1pct",
            "value": 6387140,
            "range": "± 24305",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/1pct",
            "value": 6182339,
            "range": "± 12807",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/1pct",
            "value": 73806853,
            "range": "± 1245542",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/10pct",
            "value": 6085725,
            "range": "± 35264",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/10pct",
            "value": 6184905,
            "range": "± 22881",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/10pct",
            "value": 77732090,
            "range": "± 982300",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/50pct",
            "value": 5117024,
            "range": "± 34388",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/50pct",
            "value": 5914173,
            "range": "± 28531",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/50pct",
            "value": 84094012,
            "range": "± 3307413",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/100pct",
            "value": 2038997,
            "range": "± 24297",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/100pct",
            "value": 1980031,
            "range": "± 34297",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/100pct",
            "value": 58658028,
            "range": "± 4169042",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1:1",
            "value": 12845390,
            "range": "± 120056",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1:1",
            "value": 12857796,
            "range": "± 142443",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1:1",
            "value": 79878378,
            "range": "± 1562941",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/10:1",
            "value": 3293331,
            "range": "± 9127",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/10:1",
            "value": 2697319,
            "range": "± 12780",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/10:1",
            "value": 26889292,
            "range": "± 1157270",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/50:1",
            "value": 2289436,
            "range": "± 103809",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/50:1",
            "value": 1771858,
            "range": "± 12298",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/50:1",
            "value": 23406536,
            "range": "± 258156",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/100:1",
            "value": 2153997,
            "range": "± 7884",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/100:1",
            "value": 1649793,
            "range": "± 9292",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/100:1",
            "value": 22580263,
            "range": "± 108612",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1000:1",
            "value": 2012218,
            "range": "± 9827",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1000:1",
            "value": 1529297,
            "range": "± 8303",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1000:1",
            "value": 21942730,
            "range": "± 92161",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1K",
            "value": 3447,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1K",
            "value": 3830,
            "range": "± 14",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1K",
            "value": 39232,
            "range": "± 55",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/10K",
            "value": 66281,
            "range": "± 1402",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/10K",
            "value": 97024,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/10K",
            "value": 494819,
            "range": "± 3275",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/100K",
            "value": 1180920,
            "range": "± 4603",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/100K",
            "value": 1198537,
            "range": "± 13204",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/100K",
            "value": 6071227,
            "range": "± 22135",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1M",
            "value": 12226550,
            "range": "± 49809",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1M",
            "value": 12069844,
            "range": "± 73716",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1M",
            "value": 76717226,
            "range": "± 1907971",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/0pct",
            "value": 4744044,
            "range": "± 7438",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/1pct",
            "value": 4741953,
            "range": "± 123174",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/10pct",
            "value": 4737092,
            "range": "± 8340",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/50pct",
            "value": 4646987,
            "range": "± 9718",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/100pct",
            "value": 1312887,
            "range": "± 9320",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1:1",
            "value": 10239764,
            "range": "± 35948",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/10:1",
            "value": 2210768,
            "range": "± 2612",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/50:1",
            "value": 1414091,
            "range": "± 12441",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/100:1",
            "value": 1312501,
            "range": "± 10667",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1000:1",
            "value": 1205838,
            "range": "± 6574",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1K",
            "value": 2457,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/10K",
            "value": 72676,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/100K",
            "value": 962336,
            "range": "± 2110",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1M",
            "value": 9767366,
            "range": "± 6353",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "161369871+google-labs-jules[bot]@users.noreply.github.com",
            "name": "google-labs-jules[bot]",
            "username": "google-labs-jules[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "da662c16caf3bdd0746e0adc89e3903773ebe1d7",
          "message": "Clarify set vs multiset semantics in documentation (#33)\n\nUpdated README.md and docstrings for `intersect`, `union`, and `difference` to explicitly state how each operation handles duplicates.\n- `intersect`: Multiset intersection (min count).\n- `union`: Set union (deduplicated).\n- `difference`: Removes all occurrences of elements found in `b`.\n\nAdded examples to docstrings to illustrate duplicate handling.\nFixed a panic in a `union` doc test where the destination buffer was too small.\n\nCo-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>",
          "timestamp": "2026-01-11T14:15:14-08:00",
          "tree_id": "3f637927ffd6ec50e23b3af96a8ed3e980480522",
          "url": "https://github.com/lclarkmichalek/sosorted/commit/da662c16caf3bdd0746e0adc89e3903773ebe1d7"
        },
        "date": 1768174174136,
        "tool": "cargo",
        "benches": [
          {
            "name": "deduplicate/basic/sosorted/all_unique",
            "value": 911874,
            "range": "± 33502",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_unique",
            "value": 984853,
            "range": "± 23672",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_unique",
            "value": 1194608,
            "range": "± 30778",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_unique",
            "value": 72957013,
            "range": "± 2312702",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/early_dup",
            "value": 842501,
            "range": "± 4183",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/early_dup",
            "value": 980609,
            "range": "± 21995",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/early_dup",
            "value": 971104,
            "range": "± 3407",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/early_dup",
            "value": 71180842,
            "range": "± 1742913",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/mid_dup",
            "value": 844213,
            "range": "± 3686",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/mid_dup",
            "value": 938934,
            "range": "± 15583",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/mid_dup",
            "value": 1059859,
            "range": "± 18726",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/mid_dup",
            "value": 72235633,
            "range": "± 2166067",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/late_dup",
            "value": 845254,
            "range": "± 6672",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/late_dup",
            "value": 989819,
            "range": "± 14312",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/late_dup",
            "value": 1172166,
            "range": "± 11357",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/late_dup",
            "value": 74160486,
            "range": "± 2073365",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/sosorted/all_duplicates",
            "value": 903864,
            "range": "± 2215",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/naive/all_duplicates",
            "value": 981754,
            "range": "± 6109",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/std_dedup/all_duplicates",
            "value": 1185480,
            "range": "± 6185",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/basic/hashset/all_duplicates",
            "value": 72887829,
            "range": "± 2328842",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/0pct",
            "value": 885005,
            "range": "± 3802",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/0pct",
            "value": 944063,
            "range": "± 15673",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/0pct",
            "value": 1181540,
            "range": "± 17724",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/0pct",
            "value": 74748532,
            "range": "± 2320541",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/1pct",
            "value": 885611,
            "range": "± 3659",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/1pct",
            "value": 937756,
            "range": "± 3959",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/1pct",
            "value": 1185079,
            "range": "± 11050",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/1pct",
            "value": 71852094,
            "range": "± 2276279",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/10pct",
            "value": 863888,
            "range": "± 8866",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/10pct",
            "value": 925967,
            "range": "± 6524",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/10pct",
            "value": 1115664,
            "range": "± 12979",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/10pct",
            "value": 65475894,
            "range": "± 1572237",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/50pct",
            "value": 918211,
            "range": "± 3306",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/50pct",
            "value": 796796,
            "range": "± 1782",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/50pct",
            "value": 1044381,
            "range": "± 8163",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/50pct",
            "value": 49786213,
            "range": "± 2297377",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/90pct",
            "value": 669333,
            "range": "± 1877",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/90pct",
            "value": 664716,
            "range": "± 2040",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/90pct",
            "value": 958816,
            "range": "± 2955",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/90pct",
            "value": 28848639,
            "range": "± 1903704",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/sosorted/99pct",
            "value": 592654,
            "range": "± 11047",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/naive/99pct",
            "value": 660107,
            "range": "± 4663",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/std_dedup/99pct",
            "value": 965734,
            "range": "± 3626",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/density/hashset/99pct",
            "value": 18276251,
            "range": "± 143291",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/1",
            "value": 890850,
            "range": "± 5553",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/1",
            "value": 904721,
            "range": "± 6324",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/1",
            "value": 1128653,
            "range": "± 24589",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/1",
            "value": 69835824,
            "range": "± 2159079",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/2",
            "value": 4108503,
            "range": "± 35491",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/2",
            "value": 3744393,
            "range": "± 50490",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/2",
            "value": 3867211,
            "range": "± 153426",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/2",
            "value": 62051323,
            "range": "± 3460087",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/4",
            "value": 2447267,
            "range": "± 69574",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/4",
            "value": 2223302,
            "range": "± 17986",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/4",
            "value": 2278588,
            "range": "± 72395",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/4",
            "value": 42693284,
            "range": "± 2096904",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/16",
            "value": 1103514,
            "range": "± 20102",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/16",
            "value": 1183993,
            "range": "± 20231",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/16",
            "value": 1230062,
            "range": "± 9771",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/16",
            "value": 24914848,
            "range": "± 622570",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/64",
            "value": 687017,
            "range": "± 9697",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/64",
            "value": 771400,
            "range": "± 2022",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/64",
            "value": 968067,
            "range": "± 4356",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/64",
            "value": 19414426,
            "range": "± 1197764",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/sosorted/256",
            "value": 696476,
            "range": "± 20724",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/naive/256",
            "value": 703425,
            "range": "± 2371",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/std_dedup/256",
            "value": 967079,
            "range": "± 2992",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/run_length/hashset/256",
            "value": 17010154,
            "range": "± 58222",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/zipf",
            "value": 575885,
            "range": "± 7797",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/zipf",
            "value": 666547,
            "range": "± 2032",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/zipf",
            "value": 961651,
            "range": "± 4800",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/zipf",
            "value": 16579916,
            "range": "± 76025",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/database_ids",
            "value": 2560873,
            "range": "± 17931",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/database_ids",
            "value": 2228224,
            "range": "± 27195",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/database_ids",
            "value": 2229391,
            "range": "± 19579",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/database_ids",
            "value": 69200001,
            "range": "± 2198243",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/clustered",
            "value": 867416,
            "range": "± 2242",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/clustered",
            "value": 887840,
            "range": "± 3175",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/clustered",
            "value": 1077711,
            "range": "± 5175",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/clustered",
            "value": 67739388,
            "range": "± 1695777",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/sosorted/small_runs",
            "value": 3101668,
            "range": "± 35079",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/naive/small_runs",
            "value": 2576156,
            "range": "± 21256",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/std_dedup/small_runs",
            "value": 2635993,
            "range": "± 23460",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/realistic/hashset/small_runs",
            "value": 40733642,
            "range": "± 1707799",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1K",
            "value": 713,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1K",
            "value": 537,
            "range": "± 2",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1K",
            "value": 458,
            "range": "± 1",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1K",
            "value": 22545,
            "range": "± 48",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/10K",
            "value": 7031,
            "range": "± 18",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/10K",
            "value": 5372,
            "range": "± 8",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/10K",
            "value": 5375,
            "range": "± 9",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/10K",
            "value": 234291,
            "range": "± 740",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/100K",
            "value": 79647,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/100K",
            "value": 62967,
            "range": "± 583",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/100K",
            "value": 70519,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/100K",
            "value": 2494752,
            "range": "± 10540",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/sosorted/1M",
            "value": 896152,
            "range": "± 3254",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/naive/1M",
            "value": 751078,
            "range": "± 4381",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/std_dedup/1M",
            "value": 989649,
            "range": "± 7618",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scaling/hashset/1M",
            "value": 51535396,
            "range": "± 17102953",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/50pct_unique",
            "value": 4307294,
            "range": "± 44495",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/50pct_unique",
            "value": 4221191,
            "range": "± 41619",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/50pct_unique",
            "value": 4295554,
            "range": "± 113308",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/sosorted/10pct_unique",
            "value": 2043687,
            "range": "± 24532",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/naive/10pct_unique",
            "value": 1804366,
            "range": "± 22095",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/scattered/std_dedup/10pct_unique",
            "value": 1781296,
            "range": "± 15832",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/zipf",
            "value": 619005,
            "range": "± 6116",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/zipf",
            "value": 699141,
            "range": "± 2763",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/zipf",
            "value": 1111202,
            "range": "± 7786",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/small_runs",
            "value": 3127117,
            "range": "± 59301",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/small_runs",
            "value": 2595549,
            "range": "± 26017",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/small_runs",
            "value": 2848761,
            "range": "± 25500",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/clustered",
            "value": 931337,
            "range": "± 10506",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/clustered",
            "value": 928496,
            "range": "± 45775",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/clustered",
            "value": 1287416,
            "range": "± 12202",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/sosorted/database_ids",
            "value": 2532900,
            "range": "± 12803",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/naive/database_ids",
            "value": 2217842,
            "range": "± 29933",
            "unit": "ns/iter"
          },
          {
            "name": "deduplicate/distribution/std_dedup/database_ids",
            "value": 2406811,
            "range": "± 17274",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/0pct",
            "value": 5508912,
            "range": "± 87945",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/0pct",
            "value": 6038010,
            "range": "± 41862",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/0pct",
            "value": 29113343,
            "range": "± 282835",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/1pct",
            "value": 5551693,
            "range": "± 72517",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/1pct",
            "value": 6085057,
            "range": "± 58166",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/1pct",
            "value": 32594076,
            "range": "± 357889",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/10pct",
            "value": 5281097,
            "range": "± 64418",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/10pct",
            "value": 6095577,
            "range": "± 372241",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/10pct",
            "value": 40142938,
            "range": "± 818181",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/50pct",
            "value": 4473935,
            "range": "± 75618",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/50pct",
            "value": 5623024,
            "range": "± 65360",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/50pct",
            "value": 56132786,
            "range": "± 2071808",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/sosorted/100pct",
            "value": 2778707,
            "range": "± 46469",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/naive/100pct",
            "value": 914098,
            "range": "± 4535",
            "unit": "ns/iter"
          },
          {
            "name": "difference/overlap/hashset/100pct",
            "value": 61568047,
            "range": "± 3700413",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1:1",
            "value": 13083887,
            "range": "± 146898",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1:1",
            "value": 13192612,
            "range": "± 40631",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1:1",
            "value": 46035403,
            "range": "± 562391",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/10:1",
            "value": 3163207,
            "range": "± 23978",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/10:1",
            "value": 2589306,
            "range": "± 37039",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/10:1",
            "value": 28181330,
            "range": "± 484057",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/50:1",
            "value": 2026784,
            "range": "± 105704",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/50:1",
            "value": 1428649,
            "range": "± 7495",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/50:1",
            "value": 19269904,
            "range": "± 215874",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/100:1",
            "value": 1886085,
            "range": "± 23137",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/100:1",
            "value": 1308999,
            "range": "± 80376",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/100:1",
            "value": 18563993,
            "range": "± 190306",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/sosorted/1000:1",
            "value": 1695116,
            "range": "± 42041",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/naive/1000:1",
            "value": 1336442,
            "range": "± 21274",
            "unit": "ns/iter"
          },
          {
            "name": "difference/asymmetric/hashset/1000:1",
            "value": 18063292,
            "range": "± 242478",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1K",
            "value": 2359,
            "range": "± 16",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1K",
            "value": 2798,
            "range": "± 3",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1K",
            "value": 16985,
            "range": "± 38",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/10K",
            "value": 82821,
            "range": "± 775",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/10K",
            "value": 84947,
            "range": "± 1009",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/10K",
            "value": 190362,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/100K",
            "value": 1193644,
            "range": "± 14610",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/100K",
            "value": 1220744,
            "range": "± 6029",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/100K",
            "value": 2631424,
            "range": "± 12095",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/sosorted/1M",
            "value": 12612551,
            "range": "± 65459",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/naive/1M",
            "value": 12565479,
            "range": "± 57047",
            "unit": "ns/iter"
          },
          {
            "name": "difference/scaling/hashset/1M",
            "value": 45666145,
            "range": "± 525841",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/0pct",
            "value": 5071134,
            "range": "± 50696",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/1pct",
            "value": 5096263,
            "range": "± 82900",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/10pct",
            "value": 4880354,
            "range": "± 53493",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/50pct",
            "value": 3972660,
            "range": "± 33989",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/overlap/sosorted/100pct",
            "value": 2560454,
            "range": "± 23229",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1:1",
            "value": 12447174,
            "range": "± 29823",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/10:1",
            "value": 2710544,
            "range": "± 61805",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/50:1",
            "value": 1653806,
            "range": "± 8809",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/100:1",
            "value": 1516314,
            "range": "± 8505",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/asymmetric/sosorted/1000:1",
            "value": 1376805,
            "range": "± 22857",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1K",
            "value": 2249,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/10K",
            "value": 70180,
            "range": "± 1172",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/100K",
            "value": 1152151,
            "range": "± 5128",
            "unit": "ns/iter"
          },
          {
            "name": "difference_size/scaling/sosorted/1M",
            "value": 11858267,
            "range": "± 18180",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_unique",
            "value": 262106,
            "range": "± 1176",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_unique",
            "value": 532246,
            "range": "± 1573",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_unique",
            "value": 329501,
            "range": "± 1683",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/early_dup",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/early_dup",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/early_dup",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/mid_dup",
            "value": 142121,
            "range": "± 7488",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/mid_dup",
            "value": 265865,
            "range": "± 615",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/mid_dup",
            "value": 170200,
            "range": "± 577",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/late_dup",
            "value": 235559,
            "range": "± 1756",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/late_dup",
            "value": 478103,
            "range": "± 1997",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/late_dup",
            "value": 295863,
            "range": "± 744",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/sosorted/all_duplicates",
            "value": 261929,
            "range": "± 723",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/naive/all_duplicates",
            "value": 531132,
            "range": "± 1388",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/basic/windows/all_duplicates",
            "value": 328524,
            "range": "± 795",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/0pct",
            "value": 261212,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/0pct",
            "value": 531122,
            "range": "± 874",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/0pct",
            "value": 340230,
            "range": "± 8456",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/1pct",
            "value": 258621,
            "range": "± 674",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/1pct",
            "value": 525814,
            "range": "± 2651",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/1pct",
            "value": 336968,
            "range": "± 1352",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/10pct",
            "value": 255969,
            "range": "± 429",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/10pct",
            "value": 477767,
            "range": "± 2873",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/10pct",
            "value": 295743,
            "range": "± 742",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/50pct",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/50pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/90pct",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/90pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/sosorted/99pct",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/naive/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/density/windows/99pct",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/1",
            "value": 261254,
            "range": "± 3660",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/1",
            "value": 531415,
            "range": "± 3209",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/1",
            "value": 328619,
            "range": "± 857",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/2",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/2",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/2",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/4",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/4",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/16",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/16",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/64",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/64",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/sosorted/256",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/naive/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/run_length/windows/256",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/zipf",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/zipf",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/database_ids",
            "value": 4,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/database_ids",
            "value": 7,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/database_ids",
            "value": 5,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/clustered",
            "value": 13955,
            "range": "± 31",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/clustered",
            "value": 43264,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/clustered",
            "value": 24828,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/sosorted/small_runs",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/naive/small_runs",
            "value": 2,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/realistic/windows/small_runs",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1K",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/10K",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/10K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/100K",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/100K",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/sosorted/1M",
            "value": 3,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/naive/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/scaling/windows/1M",
            "value": 1,
            "range": "± 0",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/scattered",
            "value": 284328,
            "range": "± 1496",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/scattered",
            "value": 532022,
            "range": "± 4395",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/sosorted/long_unique_run",
            "value": 255957,
            "range": "± 439",
            "unit": "ns/iter"
          },
          {
            "name": "find_first_duplicate/database_ids/naive/long_unique_run",
            "value": 478347,
            "range": "± 2437",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/0pct",
            "value": 4336614,
            "range": "± 104696",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/0pct",
            "value": 5499923,
            "range": "± 64346",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/0pct",
            "value": 28031982,
            "range": "± 111711",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/1pct",
            "value": 4468749,
            "range": "± 114593",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/1pct",
            "value": 5346594,
            "range": "± 77585",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/1pct",
            "value": 28091045,
            "range": "± 174548",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/10pct",
            "value": 4382887,
            "range": "± 75517",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/10pct",
            "value": 5259454,
            "range": "± 71501",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/10pct",
            "value": 39183424,
            "range": "± 530020",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/50pct",
            "value": 3823336,
            "range": "± 114954",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/50pct",
            "value": 4590707,
            "range": "± 80583",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/50pct",
            "value": 75914816,
            "range": "± 1580792",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/sosorted/100pct",
            "value": 1308456,
            "range": "± 30705",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/naive/100pct",
            "value": 1554922,
            "range": "± 31349",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/overlap/hashset/100pct",
            "value": 96957725,
            "range": "± 2111267",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1:1",
            "value": 10089245,
            "range": "± 49014",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1:1",
            "value": 10574275,
            "range": "± 42589",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1:1",
            "value": 46815180,
            "range": "± 730274",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/10:1",
            "value": 2097823,
            "range": "± 4752",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/10:1",
            "value": 2166770,
            "range": "± 45743",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/10:1",
            "value": 3050469,
            "range": "± 32985",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/50:1",
            "value": 632504,
            "range": "± 1502",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/50:1",
            "value": 1070616,
            "range": "± 6982",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/50:1",
            "value": 580968,
            "range": "± 1292",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/100:1",
            "value": 382755,
            "range": "± 1316",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/100:1",
            "value": 946076,
            "range": "± 1684",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/100:1",
            "value": 226064,
            "range": "± 1195",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/sosorted/1000:1",
            "value": 227018,
            "range": "± 568",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/naive/1000:1",
            "value": 831353,
            "range": "± 2634",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/asymmetric/hashset/1000:1",
            "value": 18472,
            "range": "± 27",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1K",
            "value": 1650,
            "range": "± 10",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1K",
            "value": 1982,
            "range": "± 22",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1K",
            "value": 17021,
            "range": "± 33",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/10K",
            "value": 73675,
            "range": "± 579",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/10K",
            "value": 80307,
            "range": "± 4181",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/10K",
            "value": 208061,
            "range": "± 3266",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/100K",
            "value": 906185,
            "range": "± 2546",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/100K",
            "value": 961975,
            "range": "± 6395",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/100K",
            "value": 2811257,
            "range": "± 11268",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/sosorted/1M",
            "value": 9661069,
            "range": "± 28932",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/naive/1M",
            "value": 10158212,
            "range": "± 25208",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/scaling/hashset/1M",
            "value": 47241373,
            "range": "± 628586",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/0pct",
            "value": 528705,
            "range": "± 1246",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/0pct",
            "value": 659929,
            "range": "± 924",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/1pct",
            "value": 539326,
            "range": "± 1274",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/1pct",
            "value": 661947,
            "range": "± 1113",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/10pct",
            "value": 617808,
            "range": "± 3154",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/10pct",
            "value": 678548,
            "range": "± 1459",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/50pct",
            "value": 315108,
            "range": "± 9891",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/50pct",
            "value": 391352,
            "range": "± 3169",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/sosorted/100pct",
            "value": 109136,
            "range": "± 175",
            "unit": "ns/iter"
          },
          {
            "name": "intersect/density/naive/100pct",
            "value": 137876,
            "range": "± 17942",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/0pct",
            "value": 7585782,
            "range": "± 178836",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/0pct",
            "value": 6899310,
            "range": "± 28389",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/0pct",
            "value": 78862570,
            "range": "± 646967",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/1pct",
            "value": 7305351,
            "range": "± 193459",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/1pct",
            "value": 6913565,
            "range": "± 36077",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/1pct",
            "value": 81090074,
            "range": "± 678293",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/10pct",
            "value": 7329005,
            "range": "± 726164",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/10pct",
            "value": 6881780,
            "range": "± 43660",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/10pct",
            "value": 90324239,
            "range": "± 1901138",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/50pct",
            "value": 6468591,
            "range": "± 253440",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/50pct",
            "value": 6506946,
            "range": "± 36723",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/50pct",
            "value": 102988607,
            "range": "± 2177655",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/sosorted/100pct",
            "value": 2919126,
            "range": "± 130094",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/naive/100pct",
            "value": 2073260,
            "range": "± 28799",
            "unit": "ns/iter"
          },
          {
            "name": "union/overlap/hashset/100pct",
            "value": 95486684,
            "range": "± 3045037",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1:1",
            "value": 14199245,
            "range": "± 142307",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1:1",
            "value": 13495808,
            "range": "± 22325",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1:1",
            "value": 94941271,
            "range": "± 1161322",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/10:1",
            "value": 3581198,
            "range": "± 45048",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/10:1",
            "value": 2995613,
            "range": "± 28531",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/10:1",
            "value": 30894872,
            "range": "± 342572",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/50:1",
            "value": 2455687,
            "range": "± 50509",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/50:1",
            "value": 1855691,
            "range": "± 32321",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/50:1",
            "value": 24727365,
            "range": "± 210601",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/100:1",
            "value": 2386342,
            "range": "± 31794",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/100:1",
            "value": 1806067,
            "range": "± 37488",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/100:1",
            "value": 23849185,
            "range": "± 204780",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/sosorted/1000:1",
            "value": 2131095,
            "range": "± 34053",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/naive/1000:1",
            "value": 1604587,
            "range": "± 66516",
            "unit": "ns/iter"
          },
          {
            "name": "union/asymmetric/hashset/1000:1",
            "value": 23139743,
            "range": "± 360156",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1K",
            "value": 2915,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1K",
            "value": 3403,
            "range": "± 25",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1K",
            "value": 35257,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/10K",
            "value": 85350,
            "range": "± 1504",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/10K",
            "value": 120836,
            "range": "± 5153",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/10K",
            "value": 449766,
            "range": "± 2073",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/100K",
            "value": 1252969,
            "range": "± 20112",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/100K",
            "value": 1277010,
            "range": "± 13159",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/100K",
            "value": 5865458,
            "range": "± 225805",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/sosorted/1M",
            "value": 13626715,
            "range": "± 281512",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/naive/1M",
            "value": 12878297,
            "range": "± 127985",
            "unit": "ns/iter"
          },
          {
            "name": "union/scaling/hashset/1M",
            "value": 92671157,
            "range": "± 1243893",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/0pct",
            "value": 5162222,
            "range": "± 25661",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/1pct",
            "value": 5154438,
            "range": "± 25256",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/10pct",
            "value": 5173711,
            "range": "± 33060",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/50pct",
            "value": 4838680,
            "range": "± 19925",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/overlap/sosorted/100pct",
            "value": 1281852,
            "range": "± 63226",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1:1",
            "value": 10447001,
            "range": "± 8826",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/10:1",
            "value": 2207757,
            "range": "± 25582",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/50:1",
            "value": 1390571,
            "range": "± 17721",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/100:1",
            "value": 1271274,
            "range": "± 9785",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/asymmetric/sosorted/1000:1",
            "value": 1165554,
            "range": "± 12108",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1K",
            "value": 2130,
            "range": "± 7",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/10K",
            "value": 81224,
            "range": "± 810",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/100K",
            "value": 976217,
            "range": "± 3042",
            "unit": "ns/iter"
          },
          {
            "name": "union_size/scaling/sosorted/1M",
            "value": 9946500,
            "range": "± 19974",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}
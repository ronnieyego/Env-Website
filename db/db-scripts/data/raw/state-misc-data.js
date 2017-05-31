// THis is misc data I've gotten about states
// The data generally comes from a top google result

//For Sun hours
  // This gets all hours of sun by state by summer and winter averages
  // I am missing summer/winter hours for CT, IA, VT, DE, NH
  // Source http://www.solardirect.com/pv/systems/gts/gts-sizing-sun-hours.html
  // Data collected by averaging different cities within the state

//For Monthly household info
  // THis gets average energy use by kwh/state per month for household
  // SOurce https://www.eia.gov/tools/faqs/faq.php?id=97&t=3
  // Last updated on October 2016

module.exports = [
  {
    "stateId": "AL",
    "stateFullName": "Alabama",
    "centsPerKwh": 12.97,
    "clearDays": 99,
    "dailySunHours": 4.2,
    "summerSunHours": 4.7,
    "winterSunHours": 3.4,
    "avgKwhPerHouseholdConsumed": 1218,
    "avgMonthHouseUtilCost": 142
  },
  {
    "stateId": "AK",
    "stateFullName": "Alaska",
    "centsPerKwh": 20.61,
    "clearDays": 61,
    "dailySunHours": 3.8,
    "summerSunHours": 5.8,
    "winterSunHours": 2.1,
    "avgKwhPerHouseholdConsumed": 603,
    "avgMonthHouseUtilCost": 120
  },
  {
    "stateId": "AZ",
    "stateFullName": "Arizona",
    "centsPerKwh": 11.66,
    "clearDays": 193,
    "dailySunHours": 6.5,
    "summerSunHours": 7.3,
    "winterSunHours": 5.8,
    "avgKwhPerHouseholdConsumed": 1028,
    "avgMonthHouseUtilCost": 125
  },
  {
    "stateId": "AR",
    "stateFullName": "Arkansas",
    "centsPerKwh": 9.84,
    "clearDays": 123,
    "dailySunHours": 4.7,
    "summerSunHours": 5.3,
    "winterSunHours": 3.9,
    "avgKwhPerHouseholdConsumed": 1122,
    "avgMonthHouseUtilCost": 110
  },
  {
    "stateId": "CA",
    "stateFullName": "California",
    "centsPerKwh": 18.68,
    "clearDays": 146,
    "dailySunHours": 5.7,
    "summerSunHours": 6.5,
    "winterSunHours": 4.8,
    "avgKwhPerHouseholdConsumed": 557,
    "avgMonthHouseUtilCost": 95
  },
  {
    "stateId": "CO",
    "stateFullName": "Colorado",
    "centsPerKwh": 11.88,
    "clearDays": 136,
    "dailySunHours": 5.4,
    "summerSunHours": 6.3,
    "winterSunHours": 4.6,
    "avgKwhPerHouseholdConsumed": 688,
    "avgMonthHouseUtilCost": 83
  },
  {
    "stateId": "CT",
    "stateFullName": "Connecticut",
    "centsPerKwh": 19.91,
    "clearDays": 82,
    "dailySunHours": 4.4,
    "summerSunHours": "",
    "winterSunHours": "",
    "avgKwhPerHouseholdConsumed": 731,
    "avgMonthHouseUtilCost": 153
  },
  {
    "stateId": "DE",
    "stateFullName": "Delaware",
    "centsPerKwh": 13.37,
    "clearDays": 97,
    "dailySunHours": 4.5,
    "summerSunHours": "",
    "winterSunHours": "",
    "avgKwhPerHouseholdConsumed": 977,
    "avgMonthHouseUtilCost": 131
  },
  {
    "stateId": "FL",
    "stateFullName": "Florida",
    "centsPerKwh": 11.95,
    "clearDays": 101,
    "dailySunHours": 5.4,
    "summerSunHours": 5.9,
    "winterSunHours": 4.9,
    "avgKwhPerHouseholdConsumed": 1141,
    "avgMonthHouseUtilCost": 132
  },
  {
    "stateId": "GA",
    "stateFullName": "Georgia",
    "centsPerKwh": 11.62,
    "clearDays": 112,
    "dailySunHours": 4.9,
    "summerSunHours": 5.3,
    "winterSunHours": 4.2,
    "avgKwhPerHouseholdConsumed": 1122,
    "avgMonthHouseUtilCost": 129
  },
  {
    "stateId": "HI",
    "stateFullName": "Hawaii",
    "centsPerKwh": 29.39,
    "clearDays": 90,
    "dailySunHours": 6,
    "summerSunHours": 6.7,
    "winterSunHours": 5.6,
    "avgKwhPerHouseholdConsumed": 514,
    "avgMonthHouseUtilCost": 152
  },
  {
    "stateId": "ID",
    "stateFullName": "Idaho",
    "centsPerKwh": 9.66,
    "clearDays": 120,
    "dailySunHours": 4.8,
    "summerSunHours": 5.6,
    "winterSunHours": 3.4,
    "avgKwhPerHouseholdConsumed": 957,
    "avgMonthHouseUtilCost": 95
  },
  {
    "stateId": "IL",
    "stateFullName": "Illinois",
    "centsPerKwh": 12.21,
    "clearDays": 95,
    "dailySunHours": 3.1,
    "summerSunHours": 4.1,
    "winterSunHours": 1.5,
    "avgKwhPerHouseholdConsumed": 719,
    "avgMonthHouseUtilCost": 90
  },
  {
    "stateId": "IN",
    "stateFullName": "Indiana",
    "centsPerKwh": 11.78,
    "clearDays": 88,
    "dailySunHours": 4.2,
    "summerSunHours": 5,
    "winterSunHours": 2.6,
    "avgKwhPerHouseholdConsumed": 964,
    "avgMonthHouseUtilCost": 112
  },
  {
    "stateId": "IA",
    "stateFullName": "Iowa",
    "centsPerKwh": 11.16,
    "clearDays": 105,
    "dailySunHours": 4.4,
    "summerSunHours": 4.8,
    "winterSunHours": 3.7,
    "avgKwhPerHouseholdConsumed": 847,
    "avgMonthHouseUtilCost": 99
  },
  {
    "stateId": "KS",
    "stateFullName": "Kansas",
    "centsPerKwh": 12.99,
    "clearDays": 128,
    "dailySunHours": 5.2,
    "summerSunHours": 4.6,
    "winterSunHours": 4.5,
    "avgKwhPerHouseholdConsumed": 896,
    "avgMonthHouseUtilCost": 111
  },
  {
    "stateId": "KY",
    "stateFullName": "Kentucky",
    "centsPerKwh": 10.59,
    "clearDays": 93,
    "dailySunHours": 4.9,
    "summerSunHours": 6,
    "winterSunHours": 3.6,
    "avgKwhPerHouseholdConsumed": 1120,
    "avgMonthHouseUtilCost": 115
  },
  {
    "stateId": "LA",
    "stateFullName": "Louisiana",
    "centsPerKwh": 9.57,
    "clearDays": 101,
    "dailySunHours": 4.8,
    "summerSunHours": 5.5,
    "winterSunHours": 3.9,
    "avgKwhPerHouseholdConsumed": 1286,
    "avgMonthHouseUtilCost": 120
  },
  {
    "stateId": "ME",
    "stateFullName": "Maine",
    "centsPerKwh": 16.02,
    "clearDays": 101,
    "dailySunHours": 4.4,
    "summerSunHours": 5.4,
    "winterSunHours": 3.1,
    "avgKwhPerHouseholdConsumed": 556,
    "avgMonthHouseUtilCost": 87
  },
  {
    "stateId": "MD",
    "stateFullName": "Maryland",
    "centsPerKwh": 14.36,
    "clearDays": 105,
    "dailySunHours": 4.5,
    "summerSunHours": 4.7,
    "winterSunHours": 3.8,
    "avgKwhPerHouseholdConsumed": 1012,
    "avgMonthHouseUtilCost": 140
  },
  {
    "stateId": "MA",
    "stateFullName": "Massachusetts",
    "centsPerKwh": 19.86,
    "clearDays": 98,
    "dailySunHours": 4,
    "summerSunHours": 4.5,
    "winterSunHours": 3,
    "avgKwhPerHouseholdConsumed": 602,
    "avgMonthHouseUtilCost": 119
  },
  {
    "stateId": "MI",
    "stateFullName": "Michigan",
    "centsPerKwh": 15.41,
    "clearDays": 71,
    "dailySunHours": 4.1,
    "summerSunHours": 4.8,
    "winterSunHours": 2.5,
    "avgKwhPerHouseholdConsumed": 649,
    "avgMonthHouseUtilCost": 94
  },
  {
    "stateId": "MN",
    "stateFullName": "Minnesota",
    "centsPerKwh": 12.83,
    "clearDays": 95,
    "dailySunHours": 4.5,
    "summerSunHours": 5.4,
    "winterSunHours": 3.5,
    "avgKwhPerHouseholdConsumed": 762,
    "avgMonthHouseUtilCost": 92
  },
  {
    "stateId": "MS",
    "stateFullName": "Mississippi",
    "centsPerKwh": 11.27,
    "clearDays": 111,
    "dailySunHours": 4.4,
    "summerSunHours": 4.9,
    "winterSunHours": 3.6,
    "avgKwhPerHouseholdConsumed": 1218,
    "avgMonthHouseUtilCost": 137
  },
  {
    "stateId": "MO",
    "stateFullName": "Missouri",
    "centsPerKwh": 9.96,
    "clearDays": 115,
    "dailySunHours": 4.3,
    "summerSunHours": 5.2,
    "winterSunHours": 3.6,
    "avgKwhPerHouseholdConsumed": 1033,
    "avgMonthHouseUtilCost": 116
  },
  {
    "stateId": "MT",
    "stateFullName": "Montana",
    "centsPerKwh": 10.61,
    "clearDays": 82,
    "dailySunHours": 4.7,
    "summerSunHours": 5.6,
    "winterSunHours": 3.4,
    "avgKwhPerHouseholdConsumed": 818,
    "avgMonthHouseUtilCost": 89
  },
  {
    "stateId": "NE",
    "stateFullName": "Nebraska",
    "centsPerKwh": 9.96,
    "clearDays": 117,
    "dailySunHours": 4.8,
    "summerSunHours": 5.3,
    "winterSunHours": 4.3,
    "avgKwhPerHouseholdConsumed": 962,
    "avgMonthHouseUtilCost": 102
  },
  {
    "stateId": "NV",
    "stateFullName": "Nevada",
    "centsPerKwh": 11.91,
    "clearDays": 158,
    "dailySunHours": 6.2,
    "summerSunHours": 6.8,
    "winterSunHours": 5.7,
    "avgKwhPerHouseholdConsumed": 913,
    "avgMonthHouseUtilCost": 116
  },
  {
    "stateId": "NH",
    "stateFullName": "New Hampshire",
    "centsPerKwh": 18.91,
    "clearDays": 90,
    "dailySunHours": 4.6,
    "summerSunHours": "",
    "winterSunHours": "",
    "avgKwhPerHouseholdConsumed": 621,
    "avgMonthHouseUtilCost": 115
  },
  {
    "stateId": "NJ",
    "stateFullName": "New Jersey",
    "centsPerKwh": 15.69,
    "clearDays": 94,
    "dailySunHours": 4.2,
    "summerSunHours": 4.8,
    "winterSunHours": 3.2,
    "avgKwhPerHouseholdConsumed": 696,
    "avgMonthHouseUtilCost": 110
  },
  {
    "stateId": "NM",
    "stateFullName": "New Mexico",
    "centsPerKwh": 12.84,
    "clearDays": 167,
    "dailySunHours": 6.8,
    "summerSunHours": 7.2,
    "winterSunHours": 6.2,
    "avgKwhPerHouseholdConsumed": 635,
    "avgMonthHouseUtilCost": 79
  },
  {
    "stateId": "NY",
    "stateFullName": "New York",
    "centsPerKwh": 17.48,
    "clearDays": 63,
    "dailySunHours": 3.6,
    "summerSunHours": 4.3,
    "winterSunHours": 2.2,
    "avgKwhPerHouseholdConsumed": 601,
    "avgMonthHouseUtilCost": 111
  },
  {
    "stateId": "NC",
    "stateFullName": "North Carolina",
    "centsPerKwh": 11.19,
    "clearDays": 109,
    "dailySunHours": 5,
    "summerSunHours": 5.4,
    "winterSunHours": 4.3,
    "avgKwhPerHouseholdConsumed": 1113,
    "avgMonthHouseUtilCost": 126
  },
  {
    "stateId": "ND",
    "stateFullName": "North Dakota",
    "centsPerKwh": 9.46,
    "clearDays": 93,
    "dailySunHours": 5,
    "summerSunHours": 5.5,
    "winterSunHours": 4,
    "avgKwhPerHouseholdConsumed": 1091,
    "avgMonthHouseUtilCost": 105
  },
  {
    "stateId": "OH",
    "stateFullName": "Ohio",
    "centsPerKwh": 12.15,
    "clearDays": 72,
    "dailySunHours": 4,
    "summerSunHours": 5,
    "winterSunHours": 2.7,
    "avgKwhPerHouseholdConsumed": 877,
    "avgMonthHouseUtilCost": 112
  },
  {
    "stateId": "OK",
    "stateFullName": "Oklahoma",
    "centsPerKwh": 11.07,
    "clearDays": 139,
    "dailySunHours": 5.3,
    "summerSunHours": 5.9,
    "winterSunHours": 4.6,
    "avgKwhPerHouseholdConsumed": 1093,
    "avgMonthHouseUtilCost": 111
  },
  {
    "stateId": "OR",
    "stateFullName": "Oregon",
    "centsPerKwh": 10.53,
    "clearDays": 68,
    "dailySunHours": 4.1,
    "summerSunHours": 5.4,
    "winterSunHours": 2,
    "avgKwhPerHouseholdConsumed": 902,
    "avgMonthHouseUtilCost": 96
  },
  {
    "stateId": "PA",
    "stateFullName": "Pennsylvania",
    "centsPerKwh": 14.29,
    "clearDays": 87,
    "dailySunHours": 3.6,
    "summerSunHours": 4.3,
    "winterSunHours": 2.1,
    "avgKwhPerHouseholdConsumed": 855,
    "avgMonthHouseUtilCost": 117
  },
  {
    "stateId": "RI",
    "stateFullName": "Rhode Island",
    "centsPerKwh": 19.83,
    "clearDays": 98,
    "dailySunHours": 4.2,
    "summerSunHours": 4.7,
    "winterSunHours": 3.6,
    "avgKwhPerHouseholdConsumed": 594,
    "avgMonthHouseUtilCost": 115
  },
  {
    "stateId": "SC",
    "stateFullName": "South Carolina",
    "centsPerKwh": 12.93,
    "clearDays": 115,
    "dailySunHours": 5.1,
    "summerSunHours": 5.7,
    "winterSunHours": 4.2,
    "avgKwhPerHouseholdConsumed": 1146,
    "avgMonthHouseUtilCost": 144
  },
  {
    "stateId": "SD",
    "stateFullName": "South Dakota",
    "centsPerKwh": 10.68,
    "clearDays": 104,
    "dailySunHours": 5.2,
    "summerSunHours": 5.9,
    "winterSunHours": 4.6,
    "avgKwhPerHouseholdConsumed": 981,
    "avgMonthHouseUtilCost": 109
  },
  {
    "stateId": "TN",
    "stateFullName": "Tennessee",
    "centsPerKwh": 10.52,
    "clearDays": 102,
    "dailySunHours": 4.4,
    "summerSunHours": 5.1,
    "winterSunHours": 3.2,
    "avgKwhPerHouseholdConsumed": 1248,
    "avgMonthHouseUtilCost": 129
  },
  {
    "stateId": "TX",
    "stateFullName": "Texas",
    "centsPerKwh": 11.41,
    "clearDays": 135,
    "dailySunHours": 5.7,
    "summerSunHours": 6.2,
    "winterSunHours": 5,
    "avgKwhPerHouseholdConsumed": 1176,
    "avgMonthHouseUtilCost": 136
  },
  {
    "stateId": "UT",
    "stateFullName": "Utah",
    "centsPerKwh": 10.7,
    "clearDays": 125,
    "dailySunHours": 5.5,
    "summerSunHours": 6.4,
    "winterSunHours": 4.6,
    "avgKwhPerHouseholdConsumed": 744,
    "avgMonthHouseUtilCost": 81
  },
  {
    "stateId": "VT",
    "stateFullName": "Vermont",
    "centsPerKwh": 17.51,
    "clearDays": 58,
    "dailySunHours": 4.3,
    "summerSunHours": "",
    "winterSunHours": "",
    "avgKwhPerHouseholdConsumed": 558,
    "avgMonthHouseUtilCost": 95
  },
  {
    "stateId": "VA",
    "stateFullName": "Virginia",
    "centsPerKwh": 11.09,
    "clearDays": 100,
    "dailySunHours": 4.1,
    "summerSunHours": 4.5,
    "winterSunHours": 3.4,
    "avgKwhPerHouseholdConsumed": 1149,
    "avgMonthHouseUtilCost": 131
  },
  {
    "stateId": "WA",
    "stateFullName": "Washington",
    "centsPerKwh": 9.27,
    "clearDays": 58,
    "dailySunHours": 4.4,
    "summerSunHours": 5.8,
    "winterSunHours": 2.1,
    "avgKwhPerHouseholdConsumed": 964,
    "avgMonthHouseUtilCost": 88
  },
  {
    "stateId": "WV",
    "stateFullName": "West Virginia",
    "centsPerKwh": 11.58,
    "clearDays": 60,
    "dailySunHours": 3.7,
    "summerSunHours": 4.1,
    "winterSunHours": 2.5,
    "avgKwhPerHouseholdConsumed": 1107,
    "avgMonthHouseUtilCost": 112
  },
  {
    "stateId": "WI",
    "stateFullName": "Wisconsin",
    "centsPerKwh": 14.34,
    "clearDays": 89,
    "dailySunHours": 4.3,
    "summerSunHours": 4.9,
    "winterSunHours": 3.3,
    "avgKwhPerHouseholdConsumed": 668,
    "avgMonthHouseUtilCost": 94
  },
  {
    "stateId": "WY",
    "stateFullName": "Wyoming",
    "centsPerKwh": 10.77,
    "clearDays": 114,
    "dailySunHours": 6.1,
    "summerSunHours": 6.8,
    "winterSunHours": 5.5,
    "avgKwhPerHouseholdConsumed": 832,
    "avgMonthHouseUtilCost": 91
  },
  {
    "stateId": "US",
    "stateFullName": "United States",
    "centsPerKwh": 12,
    "clearDays": 103.26,
    "dailySunHours": 4.7,
    "summerSunHours": 5.4,
    "winterSunHours": 3.7,
    "avgKwhPerHouseholdConsumed": 901,
    "avgMonthHouseUtilCost": 114
  }
];

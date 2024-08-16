export const milestones = [
    {
        imgpath: "milestone1",
        title: "Milestone 1",
        amount: "750000",
        players: "1000",
        status: "Done",

    },
    {
        imgpath: "milestone2",
        title: "Milestone 2",
        amount: "3750000",
        players: "5000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 3",
        amount: "7500000",
        players: "10000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 4",
        amount: "15000000",
        players: "20000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 5",
        amount: "22500000",
        players: "30000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 6",
        amount: "37500000",
        players: "50000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 7",
        amount: "56250000",
        players: "75000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 8",
        amount: "75000000",
        players: "100000+",
        status: "Unlocked",
    },
];
export const users = [
    "Adi Dme", "Aeid lise", "Aide jdue", "Jude Ude", "Ude List", "Wdit doke", "Lise Ude", "Udjde Jude", "Jdne Mjde"
];
export const levelNames = ['Newbie', 'Rookie', 'Beginner', 'Intermediate', 'Expert', 'Master', 'Grandmaster', 'Legendary', 'Mythical', 'Conqueror'];
export const levelTargets = [0, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 3000000, 5000000, 10000000];
export const levelBonus = [1000, 2000, 5000, 10000, 20000, 35000, 50000, 75000, 150000];
export const energyLimit = [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 10000];

export function tokenToLevel(token: number){
    for (let i: number = 0; i < levelTargets.length; i++) {
        if (token < levelTargets[i]) {
            return i;
        }
    }
}

export function tokenToProgress(token: number) {
    for (let i = 0; i < levelTargets.length; i++) {
        if (token < levelTargets[i]) {
            return (token - levelTargets[i - 1]) * 100 / (levelTargets[i] - levelTargets[i - 1]);
        }
    }
}

export const dailyCheckItems = [
    {
      id: 1,
      icon: "dailyCheck",
      name: "Daily Check in!",
      coin: "+25.000"
    },
    {
      id: 2,
      icon: "retweet",
      name: "Retweet a Post",
      coin: "+25.000"
    },
    {
      id: 3,
      icon: "comment",
      name: "Comment on a Post",
      coin: "+25.000"
    },
    {
      id: 4,
      icon: "likePost",
      name: "Like a Post",
      coin: "+25.000"
    },
  ];
export const taskListItems = [
    {
      id: 1,
      icon: "instagram",
      name: "Follow Instagram",
      coin: "+25.000"
    },
    {
      id: 1,
      icon: "youtube",
      name: "Subscribe to YouTube",
      coin: "+25.000"
    },
    {
      id: 1,
      icon: "telegram",
      name: "Join Telegram Group",
      coin: "+25.000"
    }
  ];
export const dailyCoins = [
    {
      day: "Day 1",
      points: "500",
      status: "day_1"
    },
    {
      day: "Day 2",
      points: "1000",
      status: "day_2"
    },
    {
      day: "Day 3",
      points: "2000",
      status: "day_3"
    },
    {
      day: "Day 4",
      points: "3000",
      status: "day_4"
    },
    {
      day: "Day 5",
      points: "4000",
      status: "day_5"
    },
    {
      day: "Day 6",
      points: "5000",
      status: "day_6"
    },
    {
      day: "Day 7",
      points: "10000",
      status: "day_7"
    }
  ];

export const levels = [
  {
    icon: "Newbie",
    name: "Newbie",
    target: "10000",
    earn: "10000"
  },
  {
    icon: "Rookie",
    name: "Rookie",
    target: "20000",
    earn: "10000"
  },
  {
    icon: "Beginner",
    name: "Beginner",
    target: "50000",
    earn: "30000"
  },
  {
    icon: "Intermediate",
    name: "Intermediate",
    target: "100000",
    earn: "70000"
  },
  {
    icon: "Expert",
    name: "Expert",
    target: "200000",
    earn: "100000"
  },
  {
    icon: "Master",
    name: "Master",
    target: "500000",
    earn: "300000"
  },
  {
    icon: "Grandmaster",
    name: "Grandmaster",
    target: "1000000",
    earn: "500000"
  },
  {
    icon: "Legendary",
    name: "Legendary",
    target: "3000000",
    earn: "2000000"
  },
  {
    icon: "Mythical",
    name: "Mythical",
    target: "5000000",
    earn: "2000000"
  },
  {
    icon: "Conqueror",
    name: "Conqueror",
    target: "10000000",
    earn: "5000000"
  }
] 
  
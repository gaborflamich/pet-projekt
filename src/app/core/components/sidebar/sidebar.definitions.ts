export type INavCat = {
  readonly title?: string;
  readonly url?: string;
  readonly children?: readonly INavCat[];
};

export type INav = {
  readonly apps?: readonly INavCat[];
  readonly todayPlan?: readonly INavCat[];
  readonly weeklyPlan?: readonly INavCat[];
  readonly components?: readonly INavCat[];
  readonly futureComponents?: readonly INavCat[];
  readonly futureApps?: readonly INavCat[];
};

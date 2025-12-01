export type ModuleSection = {
  title: string;
  description: string;
  code: string;
  highlight?: string;
};

export type ModuleResource = {
  title: string;
  url: string;
  description: string;
};

export type LearningModule = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  docLink: string;
  sections: ModuleSection[];
  resources: ModuleResource[];
};

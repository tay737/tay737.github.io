export type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  year: string;
  status: string;
  featured: boolean;
  type: 'public' | 'private' | 'experiment' | 'coming-soon';
};

export type Interest = {
  category: string;
  items: {
    title: string;
    description?: string;
    image?: string;
  }[];
};

export type FlagType = 'transgender' | 'nonbinary' | 'genderfluid' | 'none';

export type SystemProfile = {
  id: string;
  displayName: string;
  role: string;
  terminal: {
    username: string;
    hostname: string;
    workingDirectory: string;
  };
  ascii: string;
  flag: FlagType;
  systemInfo: { label: string; value: string }[];
};

export type Peripheral = {
  type: string;
  name: string;
  description?: string;
};

export type SetupProfile = {
  id: string;
  name: string;
  operatingSystem: string;
  specs: Record<string, string>;
  peripherals?: Peripheral[];
};

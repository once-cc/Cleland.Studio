export interface NavItem {
  label: string;
  href: string;
  number: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
  isComingSoon?: boolean; // Editorial placeholder state
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

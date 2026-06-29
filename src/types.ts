export interface CommitItem {
  id: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  staged?: boolean;
}

export interface BranchItem {
  name: string;
  type: 'local' | 'remote';
  isCurrent?: boolean;
  commitsCount: number;
}

export interface StashItem {
  id: string;
  name: string;
  message: string;
  date: string;
  filesCount: number;
}

export interface FileStatus {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'untracked';
  linesAdded: number;
  linesDeleted: number;
}

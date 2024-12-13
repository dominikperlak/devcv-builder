import { Octokit as OctokitClient } from '@octokit/rest';

export interface GitHubProfile {
  name: string;
  bio: string;
  email: string;
  location: string;
  repos: Array<{
    name: string;
    description: string;
    language: string;
    stars: number;
  }>;
}

export const fetchGitHubProfile = async (
  username: string
): Promise<GitHubProfile> => {
  const octokit = new OctokitClient();

  try {
    const userResponse = await octokit.request('GET /users/{username}', {
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const reposResponse = await octokit.request('GET /users/{username}/repos', {
      username,
      sort: 'updated',
      per_page: 5,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const repos = reposResponse.data.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || 'Not specified',
      stars: repo.stargazers_count || 0, // Default to 0 if undefined
    }));

    return {
      name: userResponse.data.name || '',
      bio: userResponse.data.bio || '',
      email: userResponse.data.email || '',
      location: userResponse.data.location || '',
      repos,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw new Error('Failed to fetch GitHub profile');
  }
};

export const generateSummaryFromGitHub = (profile: GitHubProfile): string => {
  const topLanguages = profile.repos
    .map((repo) => repo.language)
    .filter(Boolean)
    .reduce((acc: { [key: string]: number }, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

  const languages = Object.entries(topLanguages)
    .sort(([, a], [, b]) => b - a)
    .map(([lang]) => lang)
    .slice(0, 3)
    .join(', ');

  return `${profile.bio ? profile.bio + ' ' : ''}Experienced developer with expertise in ${languages}. Notable projects include ${profile.repos
    .slice(0, 2)
    .map((repo) => repo.name)
    .join(
      ' and '
    )}. Passionate about creating efficient and scalable solutions.`;
};

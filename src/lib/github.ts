export interface GitHubRepoData {
  name: string;
  description: string;
  readme: string;
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    // Standardize URL by removing trailing slash and .git if present
    const cleanUrl = url.trim().replace(/\/$/, "").replace(/\.git$/, "");
    const parts = cleanUrl.split("github.com/");
    if (parts.length < 2) return null;
    
    const pathParts = parts[1].split("/");
    if (pathParts.length < 2) return null;
    
    return {
      owner: pathParts[0],
      repo: pathParts[1],
    };
  } catch (error) {
    console.error("Failed to parse GitHub URL:", url, error);
    return null;
  }
}

export async function fetchRepoData(repoUrl: string): Promise<GitHubRepoData | null> {
  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) return null;

  const { owner, repo } = parsed;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    // 1. Fetch Repository Details
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 }, // Cache on server for 1 hour if SSR
    });

    if (!repoResponse.ok) {
      throw new Error(`GitHub Repo API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }

    const repoData = await repoResponse.json();

    // 2. Fetch Repository README (Raw Markdown)
    const readmeHeaders: HeadersInit = {
      Accept: "application/vnd.github.raw+json", // Fetch raw Markdown text
    };
    if (token) {
      readmeHeaders["Authorization"] = `token ${token}`;
    }

    let readme = "README not found or empty.";
    try {
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: readmeHeaders,
        next: { revalidate: 3600 },
      });

      if (readmeResponse.ok) {
        readme = await readmeResponse.text();
      }
    } catch (readmeError) {
      console.warn(`Could not fetch README for ${repo}:`, readmeError);
    }

    return {
      name: repoData.name || repo,
      description: repoData.description || "",
      readme,
    };
  } catch (error) {
    console.error(`Error fetching data for ${owner}/${repo}:`, error);
    return null;
  }
}

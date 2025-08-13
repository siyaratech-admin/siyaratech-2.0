interface BlogPost {
  name: string;
  meta_title: string;
  meta_description: string;
  meta_image: string;
}

interface BlogApiResponse {
  data: BlogPost[];
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const apiKey = process.env.ERP_NEXT_API_KEY;
    const apiSecret = process.env.ERP_NEXT_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      throw new Error('ERPNext API credentials not found');
    }

    const url = new URL('https://siyaratech.m.erpnext.com/api/resource/Blog%20Post');
    
    // Add query parameters
    url.searchParams.append('fields', '["name","meta_title","meta_description","meta_image"]');
    url.searchParams.append('limit_page_length', '100');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    const data: BlogApiResponse = await response.json();
    
    // Filter out blogs without required fields
    return data.data.filter(blog => 
      blog.meta_title && 
      blog.meta_description && 
      blog.meta_image
    );
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

// Transform blog data for frontend use
export function transformBlogData(blogs: BlogPost[]) {
  return blogs.map(blog => ({
    id: blog.name,
    title: blog.meta_title,
    description: blog.meta_description,
    image: blog.meta_image,
  }));
}

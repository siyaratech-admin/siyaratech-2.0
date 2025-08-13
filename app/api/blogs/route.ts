import { NextResponse } from 'next/server';

interface BlogPost {
  name: string;
  meta_title: string;
  meta_description: string;
  meta_image: string;
}

interface BlogApiResponse {
  data: BlogPost[];
}

export async function GET() {
  try {
    const apiKey = process.env.ERP_NEXT_API_KEY;
    const apiSecret = process.env.ERP_NEXT_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'ERPNext API credentials not found' },
        { status: 500 }
      );
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
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch blogs: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: BlogApiResponse = await response.json();
    
    // Filter and transform blog data
    const blogs = data.data
      .filter(blog => 
        blog.meta_title && 
        blog.meta_description && 
        blog.meta_image
      )
      .map(blog => ({
        id: blog.name,
        title: blog.meta_title,
        description: blog.meta_description,
        image: blog.meta_image,
      }));

    return NextResponse.json({ blogs });
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

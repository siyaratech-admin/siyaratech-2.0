import { NextResponse } from 'next/server';

export async function GET() {
  const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL;
  const API_KEY = process.env.ERPNEXT_API_KEY; // Optional, if needed for private blogs
  const API_SECRET = process.env.ERPNEXT_API_SECRET; // Optional

  if (!ERPNEXT_URL) {
    console.warn("NEXT_PUBLIC_ERPNEXT_URL is not defined. Returning mock data.");
    // Return mock data if no URL is configured
    return NextResponse.json({
      blogs: [
        {
          id: '1',
          title: 'The Future of AI in Enterprise',
          description: 'How artificial intelligence is reshaping business operations and decision-making processes.',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        },
        {
          id: '2',
          title: 'Cloud Migration Strategies',
          description: 'Best practices for moving your legacy infrastructure to the cloud securely and efficiently.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        },
        {
          id: '3',
          title: 'Cybersecurity in 2025',
          description: 'Emerging threats and the advanced security measures needed to protect your digital assets.',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        },
      ]
    });
  }

  try {
    // Fetch blogs from ERPNext
    // Assuming standard ERPNext Blog Post doctype
    const response = await fetch(`${ERPNEXT_URL}/api/resource/Blog Post?fields=["name","title","blog_intro","meta_image","published_on"]&filters=[["published","=",1]]&order_by=published_on desc&limit_page_length=6`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `token ${API_KEY}:${API_SECRET}` // Uncomment if auth is needed
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ERPNext API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch from ERPNext: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    // Transform ERPNext data to our format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogs = data.data.map((item: any) => ({
      id: item.name,
      title: item.title,
      description: item.blog_intro || item.title, // Fallback if intro is missing
      image: item.meta_image ? (item.meta_image.startsWith('http') ? item.meta_image : `${ERPNEXT_URL}${item.meta_image}`) : 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&q=80', // Handle relative URLs
    }));

    return NextResponse.json({ blogs });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in blog API:', error);
    return NextResponse.json({
      error: 'Failed to fetch blogs',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization');
    console.log('Frontend API: GET /api/profile');
    console.log('Token present:', !!token);
    console.log('Backend URL:', BACKEND_URL);
    
    if (!token) {
      console.log('No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const backendUrl = `${BACKEND_URL}/api/profile`;
    console.log('Calling backend URL:', backendUrl);
    
    const response = await fetch(backendUrl, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text(); // HTML ya error page
    }
    
    console.log('Backend response data:', data);
    
    if (!response.ok) {
      console.log('Backend returned error:', response.status, data);
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const token = request.headers.get('authorization');
    console.log('Frontend API: PUT /api/profile');
    console.log('Token present:', !!token);
    console.log('Content-Type:', request.headers.get('content-type'));
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const formData = await request.formData();
    console.log('FormData received with fields:', Array.from(formData.keys()));
    
    // Check if there's a file in the FormData
    const avatarFile = formData.get('avatar');
    const hasFile = avatarFile instanceof File && avatarFile.size > 0;
    console.log('Has file:', hasFile);
    if (hasFile) {
      console.log('File details:', {
        name: avatarFile.name,
        size: avatarFile.size,
        type: avatarFile.type
      });
    }
    
    if (hasFile) {
      // If there's a file, send FormData directly to backend
      console.log('Sending FormData to backend...');
      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log('Backend PUT response status:', response.status);
      console.log('Backend PUT response data:', data);
      
      if (!response.ok) {
        return NextResponse.json({ error: data }, { status: response.status });
      }

      return NextResponse.json(data);
    } else {
      // If no file, convert FormData to JSON for the backend
      const body = {};
      for (const [key, value] of formData.entries()) {
        body[key] = value;
      }
      console.log('JSON body for backend:', body);

      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log('Backend PUT response status:', response.status);
      console.log('Backend PUT response data:', data);
      
      if (!response.ok) {
        return NextResponse.json({ error: data }, { status: response.status });
      }

      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
'use client'

import { useState, useEffect } from 'react'

export default function MyGigsPage() {
  const [gigs, setGigs] = useState([])

  const loadGigs = async () => {
    const res = await fetch("/api/recruiter/gig/list?recruiterId=demo-recruiter-1");
    const data = await res.json();
    if (data.success) {
      setGigs(data.gigs);
    }
  };

  const deleteGig = async (id: string) => {
    const res = await fetch("/api/recruiter/gig/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gigId: id })
    });
    const data = await res.json();
    if (data.success) loadGigs();
  };

  useEffect(() => {
    loadGigs();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Gigs</h1>
      <div>
        {gigs.map((gig: any) => (
          <div key={gig.id} className="p-4 bg-gray-800 rounded-lg mb-4 relative">
            <h2 className="text-white">{gig.title}</h2>
            <p className="text-gray-400">{gig.description}</p>
            <button
              onClick={() => deleteGig(gig.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

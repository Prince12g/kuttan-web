import React, { useState, useRef } from "react";

// Smart NFC Personal Branding - Single-file React component
// TailwindCSS utility classes assumed available in the hosting project.
// Default export is the main App component so this file can be dropped into a React app.

export default function App() {
  // Sample profile state (editable via the Web Editor Dashboard)
  const [profile, setProfile] = useState({
    name: "Aisha Khan",
    title: "Product Designer & Frontend Engineer",
    pitch: "I design delightful product experiences and ship front-end code.",
    heroImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=60",
    introVideo: "", // optional: mp4 link
    contact: {
      email: "aisha@example.com",
      phone: "+91 98765 43210",
      website: "https://your-profile.example.com",
    },
    portfolio: [
      { id: 1, title: "Marketplace Redesign", desc: "UX + Frontend", img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=60" },
      { id: 2, title: "Mobile App v2", desc: "Product + PM", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60" },
      { id: 3, title: "Design System", desc: "React + Storybook", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=60" },
    ],
    milestones: [
      { year: "2019", text: "Joined Fintech startup as Product Designer" },
      { year: "2021", text: "Promoted to Design + Frontend Lead" },
      { year: "2023", text: "Launched a multi-platform product used by 100k+ users" },
    ],
    products: [
      { name: "Design Audit", blurb: "Deep UX audit with prioritized fixes." },
      { name: "Frontend Implementation", blurb: "Pixel-perfect UI using React." },
      { name: "NFC Business Card Setup", blurb: "Custom NFC profile cards + hosting." },
    ],
    testimonials: [
      { who: "Ravi, CEO @ Finovate", text: "Aisha drove measurable improvements to our conversion rate." },
      { who: "Maya, PM", text: "Reliable, fast, and a joy to work with." },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profile.contact.website);

  // Helper: build vCard and trigger download (for Save Contact)
  function downloadVCard() {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name}\nTITLE:${profile.title}\nEMAIL:${profile.contact.email}\nTEL:${profile.contact.phone}\nURL:${profile.contact.website}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // NFC tap simulation: opens profile URL in a new tab
  function simulateNfcTap() {
    window.open(profile.contact.website, "_blank");
  }

  // Web Editor: apply updates to the profile state
  function handleEditorChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setProfile((p) => ({ ...p, contact: { ...p.contact, [key]: value } }));
    } else {
      setProfile((p) => ({ ...p, [name]: value }));
    }
  }

  // Simple function to update a portfolio item's description (demo)
  function updatePortfolioDesc(id, newDesc) {
    setProfile((p) => ({
      ...p,
      portfolio: p.portfolio.map((it) => (it.id === id ? { ...it, desc: newDesc } : it)),
    }));
  }

  // ref for timeline for small animation demo
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* NAV */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">AK</div>
            <div>
              <div className="font-semibold">{profile.name}</div>
              <div className="text-xs text-gray-500">{profile.title}</div>
            </div>
          </div>

          <nav className="space-x-4 text-sm">
            <a href="#portfolio" className="hover:underline">Portfolio</a>
            <a href="#milestones" className="hover:underline">Milestones</a>
            <a href="#company" className="hover:underline">Company</a>
            <a href="#nfc" className="hover:underline">NFC Card</a>
            <a href="#dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="container mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{profile.title} — {profile.pitch}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={downloadVCard} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">Save Contact</button>
            <button onClick={() => setPreviewUrl(profile.contact.website)} className="px-4 py-2 border rounded-lg">Open Profile</button>
            <button onClick={simulateNfcTap} className="px-4 py-2 border rounded-lg">Simulate NFC Tap</button>
            <button onClick={() => setEditing((s) => !s)} className="px-4 py-2 bg-gray-100 rounded-lg">{editing ? 'Close Editor' : 'Open Editor'}</button>
          </div>

          <div className="mt-6 text-sm text-gray-500">One-tap profile sharing, instant vCard download, and real-time edit from the dashboard.</div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          {profile.introVideo ? (
            <video src={profile.introVideo} controls className="w-full h-64 object-cover" />
          ) : (
            <img src={profile.heroImage} alt="hero" className="w-full h-64 object-cover" />
          )}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.portfolio.map((p) => (
            <article key={p.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.desc}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => updatePortfolioDesc(p.id, p.desc + ' ⭐')} className="text-xs px-2 py-1 border rounded">Add Star</button>
                  <a href={profile.contact.website} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 border rounded">View</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section id="milestones" className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Milestones</h2>
        <ol className="border-l-2 border-gray-200 pl-6 space-y-6">
          {profile.milestones.map((m, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-5 top-0 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{m.year}</span>
              <div className="ml-6">
                <p className="text-gray-700">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* COMPANY SPOTLIGHT */}
      <section id="company" className="container mx-auto px-6 py-8 bg-white rounded-lg shadow">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Products & Services</h3>
            <p className="mt-2 text-sm text-gray-600">Clear overviews of offerings and services so potential clients immediately know how you can help.</p>
            <ul className="mt-4 space-y-3">
              {profile.products.map((prod, idx) => (
                <li key={idx} className="p-3 border rounded">
                  <div className="font-semibold">{prod.name}</div>
                  <div className="text-sm text-gray-600">{prod.blurb}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Client Testimonials</h3>
            <div className="mt-4 space-y-4">
              {profile.testimonials.map((t, i) => (
                <blockquote key={i} className="p-4 bg-gray-50 rounded">
                  <p className="text-gray-700">“{t.text}”</p>
                  <cite className="block mt-2 text-xs text-gray-500">— {t.who}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NFC Card */}
      <section id="nfc" className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold">NFC Card — Tap-to-Share</h2>
            <p className="mt-2 text-sm text-gray-600">Instantly launch your profile when someone taps your NFC business card. Customize finishes, add logos, and track taps via your dashboard (analytics coming soon).</p>

            <ul className="mt-4 space-y-2 text-sm">
              <li>• Tap-to-Share: Instant profile launch</li>
              <li>• Custom Branding: Logos, colors, premium finishes</li>
              <li>• Analytics: See how often your card was tapped (mocked in dashboard)</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <button onClick={simulateNfcTap} className="px-4 py-2 bg-indigo-600 text-white rounded">Simulate Tap</button>
              <button className="px-4 py-2 border rounded">Order NFC Cards</button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-40 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-xl shadow-lg p-4 flex flex-col justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">AK</div>
                <div>
                  <div className="font-semibold">{profile.name}</div>
                  <div className="text-xs">{profile.title}</div>
                </div>
              </div>
              <div className="text-xs opacity-90">Tap to view profile</div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART MANAGEMENT - Dashboard */}
      <section id="dashboard" className="container mx-auto px-6 py-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Web Editor Dashboard</h2>
        <p className="text-sm text-gray-600 mb-4">Change profile details instantly — updates reflect on the live profile and NFC share link.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-600">Full Name</label>
            <input name="name" value={profile.name} onChange={handleEditorChange} className="w-full mt-1 p-2 border rounded" />

            <label className="block text-xs text-gray-600 mt-3">Title</label>
            <input name="title" value={profile.title} onChange={handleEditorChange} className="w-full mt-1 p-2 border rounded" />

            <label className="block text-xs text-gray-600 mt-3">Pitch</label>
            <input name="pitch" value={profile.pitch} onChange={handleEditorChange} className="w-full mt-1 p-2 border rounded" />

            <label className="block text-xs text-gray-600 mt-3">Website (profile URL)</label>
            <input name="contact.website" value={profile.contact.website} onChange={handleEditorChange} className="w-full mt-1 p-2 border rounded" />

            <div className="mt-4 flex gap-2">
              <button onClick={() => { setEditing(false); alert('Profile saved and published (simulated).'); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Save & Publish</button>
              <button onClick={() => { setProfile((p) => ({ ...p })); alert('Changes reverted (simulated).'); }} className="px-4 py-2 border rounded">Revert</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Android App Mobility</h3>
            <p className="text-sm text-gray-600 mt-2">Edit on the go: the Android app mirrors the web editor so you can update contact info, portfolio items, or push new hero media while you're away from your desk.</p>

            <div className="mt-4">
              <div className="p-4 border rounded bg-gray-50">
                <div className="text-xs text-gray-500">Mock Analytics</div>
                <div className="mt-2 font-semibold text-xl">1,234</div>
                <div className="text-sm text-gray-500">Total profile taps</div>
              </div>

              <div className="mt-4 p-4 border rounded">
                <div className="text-sm">App Actions:</div>
                <ul className="mt-2 text-sm list-disc list-inside text-gray-600">
                  <li>Edit profile fields</li>
                  <li>Push hero image or video</li>
                  <li>View tap analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / Live preview iframe */}
      <footer className="container mx-auto px-6 py-8 text-sm text-gray-500">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <strong>{profile.name}</strong>
            <div>{profile.title}</div>
          </div>

          <div>
            <div>Preview</div>
            <div className="mt-2 text-xs text-gray-600">Live preview: click to open the profile link below.</div>
            <div className="mt-2">
              <a href={previewUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Open profile</a>
            </div>
          </div>

          <div>
            <div>Contact</div>
            <div className="text-xs">{profile.contact.email} · {profile.contact.phone}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

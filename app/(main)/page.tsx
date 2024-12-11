'use client';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

const Landing = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium">DevResume</h1>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-/80">
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/builder')}
              className="bg-white text-slate-900 hover:bg-white/90"
            >
              Get Started
            </Button>
          </div>
        </header>

        <div className="py-24 md:py-32 space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Craft Your Perfect Developer Resume
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Create a standout resume that showcases your technical expertise.
              Import your experience directly from GitHub and LinkedIn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push('/builder')}
                className="bg-white text-slate-900 hover:bg-white/90 text-lg group"
              >
                Create Resume
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg"
                style={{ color: 'white' }}
              >
                View Templates
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub Integration</h3>
              <p className="text-slate-400">
                Import your projects and contributions directly from your GitHub
                profile.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn Sync</h3>
              <p className="text-slate-400">
                Seamlessly import your professional experience from LinkedIn.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Export</h3>
              <p className="text-slate-400">
                Download your resume in multiple formats or share via a unique
                link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

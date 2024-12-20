'use client';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import { Github, ArrowRight, Download } from 'lucide-react';

const Landing = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium">ResumeBot</h1>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="bg-white text-slate-900 hover:bg-white/90"
              onClick={() => router.push('/sign-in')}
            >
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
              Import your experience directly from GitHub.
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
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="mx-auto h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Github className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                GitHub Integration
              </h3>
              <p className="text-slate-300 mb-6">
                Seamlessly import your projects, contributions, and coding
                history directly from your GitHub profile with a single click.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="mx-auto h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Download className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                One-Click Export
              </h3>
              <p className="text-slate-300 mb-6">
                Instantly download your professionally crafted resume in
                multiple formats or generate a shareable professional link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

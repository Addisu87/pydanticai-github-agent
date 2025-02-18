
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (isSignUp: boolean) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Check your email",
          description: "We sent you a confirmation link.",
        });
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 glass-morphism">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>
        <div className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/90 text-black placeholder:text-gray-500"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/90 text-black placeholder:text-gray-500"
            />
          </div>
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/80 text-accent-foreground font-semibold border-2"
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

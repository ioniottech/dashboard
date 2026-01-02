import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignUp() {
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Run reCAPTCHA v3 (if site key provided) to get a token before attempting signup
    const loadReCaptcha = (siteKey: string) =>
      new Promise<any>((resolve, reject) => {
        try {
          if ((window as any).grecaptcha && (window as any).grecaptcha.execute) return resolve((window as any).grecaptcha);
          const id = 'recaptcha-v3-script';
          if (document.getElementById(id)) {
            const waitForG = () => {
              if ((window as any).grecaptcha && (window as any).grecaptcha.ready) resolve((window as any).grecaptcha);
              else setTimeout(waitForG, 50);
            };
            waitForG();
            return;
          }
          const script = document.createElement('script');
          script.id = id;
          script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            if ((window as any).grecaptcha) resolve((window as any).grecaptcha);
            else reject(new Error('grecaptcha not available after script load'));
          };
          script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
          document.head.appendChild(script);
        } catch (err) {
          reject(err);
        }
      });

    const getReCaptchaToken = async (siteKey: string) => {
      const grecaptcha = await loadReCaptcha(siteKey);
      return new Promise<string>((resolve, reject) => {
        try {
          grecaptcha.ready(() => {
            grecaptcha.execute(siteKey, { action: 'signup' }).then((token: string) => resolve(token)).catch(reject);
          });
        } catch (err) {
          reject(err);
        }
      });
    };

    setIsLoading(true);

    // If a site key is configured, require a valid token. If not configured, warn and proceed.
    if (RECAPTCHA_SITE_KEY) {
      try {
        const token = await getReCaptchaToken(RECAPTCHA_SITE_KEY);
        // You should verify this token on your server. For now we log it so developers can confirm it loads.
        console.debug('reCAPTCHA token:', token?.slice(0, 10) + '...');
      } catch (err) {
        console.error('reCAPTCHA failed to load or execute', err);
        setIsLoading(false);
        alert('reCAPTCHA failed to load — check console and domain restrictions.');
        return;
      }
    } else {
      console.warn('VITE_RECAPTCHA_SITE_KEY not set — skipping reCAPTCHA. Configure site key to enable protection.');
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.message || "Failed to create account";
      alert(message);
    }
  };

  const passwordStrength = formData.password
    ? formData.password.length >= 12 && /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password)
      ? "strong"
      : formData.password.length >= 8
        ? "medium"
        : "weak"
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center relative overflow-hidden py-12">
      {/* Animated background glow effects */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "-100px",
          right: "-100px",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          bottom: "-100px",
          left: "-100px",
        }}
      />

      <div className="w-full max-w-md px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
             <img src="/images/logo.webp" alt="App Logo" className="w-20 h-20" />
            {/* <motion.div
              className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{ boxShadow: ["0 0 20px rgba(255, 102, 51, 0.3)", "0 0 40px rgba(255, 102, 51, 0.6)", "0 0 20px rgba(255, 102, 51, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
               <img src="/images/logo.webp" alt="App Logo" className="w-20 h-20" />
            </motion.div> */}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join us and start managing your IoT ecosystem</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-8 shadow-xl"
        >
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground font-medium">
                  First Name
                </Label>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground font-medium">
                  Last Name
                </Label>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                  />
                </motion.div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  required
                />
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </motion.div>
              {passwordStrength && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: passwordStrength === "weak" ? "33%" : passwordStrength === "medium" ? "66%" : "100%",
                      }}
                      className={`h-full rounded-full transition-all ${
                        passwordStrength === "weak" ? "bg-destructive" : passwordStrength === "medium" ? "bg-yellow-500" : "bg-primary"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground capitalize">{passwordStrength}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm Password
              </Label>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </motion.div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-primary text-sm">
                  <Check className="w-4 h-4" />
                  Passwords match
                </motion.div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary cursor-pointer mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                {/* <a href="#" className="text-primary hover:text-accent font-medium transition-colors"> */}
                  Terms of Service
                {/* </a>{" "} */}
                and{" "}
                {/* <a href="#" className="text-primary hover:text-accent font-medium transition-colors"> */}
                  Privacy Policy
                {/* </a> */}
              </label>
            </div>

            {/* Sign Up Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-300"
                disabled={isLoading || !agreeToTerms}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">or sign up with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  setIsLoading(true);
                  const provider = new GoogleAuthProvider();
                  await signInWithPopup(auth, provider);
                  setIsLoading(false);
                  navigate("/dashboard");
                } catch (e: any) {
                  setIsLoading(false);
                  alert(e?.message || "Google sign-up failed");
                }
              }}
              className="w-full py-2 px-4 border border-border rounded-lg bg-background hover:bg-background/80 text-foreground font-medium transition-colors"
            >
              Google
            </motion.button>
            {/* GitHub login removed */}
          </div>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:text-accent font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

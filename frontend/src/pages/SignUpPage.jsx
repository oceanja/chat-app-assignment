import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="auth-shell">
            {/* Left side decoration */}
            <div className="auth-panel">
                <div className="panel-grid" />
                <div className="panel-blob blob1" />
                <div className="panel-blob blob2" />
                <div className="panel-blob blob3" />
                <div className="panel-bubbles">
                    {[
                        { cls: "them", text: "Hey! Just sent you the new design specs 🎨", delay: 0 },
                        { cls: "me", text: "Got it, looking really clean. Love the new color palette!", delay: 0.3 },
                        { cls: "them", text: "Thanks! Took forever to get the gradients right 😅", delay: 0.6 },
                        { cls: "me", text: "The typing animation is so smooth too", delay: 0.9 },
                        { cls: "them", text: "working on read receipts next ✓✓", delay: 1.2 },
                    ].map((b, i) => (
                        <div key={i} className={`demo-bubble ${b.cls}`} style={{ animationDelay: `${b.delay + 1}s` }}>{b.text}</div>
                    ))}
                </div>
                <div className="panel-copy">
                    <div className="panel-logo">
                        <div className="logo-mark">C</div>
                        <span className="syne" style={{ fontSize: 18, fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.02em" }}>Connect</span>
                    </div>
                    <div className="panel-h1">Real-time chat,<br />refined.</div>
                    <div className="panel-sub">Instant messaging with typing indicators, read receipts, and presence — beautifully designed for humans.</div>
                </div>
            </div>

            {/* Right side form */}
            <div className="auth-form-side">
                <div className="auth-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                        <div className="logo-mark" style={{ width: 36, height: 36, fontSize: 18, borderRadius: 10 }}>C</div>
                        <span className="syne" style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Connect</span>
                    </div>

                    <div className="auth-heading">Create account</div>
                    <div className="auth-sub">Start chatting in seconds. No credit card required.</div>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Display Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="field">
                            <label>Password</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    style={{ paddingRight: "40px" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", alignItems: "center" }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button className="btn-primary" type="submit" disabled={isSigningUp}>
                            {isSigningUp ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Create Account →"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

import React, { useState } from 'react'
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Building2,
  School,
  Landmark,
  Mail,
  Phone,
  Briefcase,
  Check,
  Sparkles
} from 'lucide-react'

export default function SignupPage({ onNavigate }) {
  const userRoles = [
    {
      id: 'CANDIDATE',
      title: 'Candidate / Learner',
      badge: 'Popular',
      badgeColor: 'badge-brand',
      icon: GraduationCap,
      description: 'Students, job seekers, and professionals looking for skilling, internships & jobs.'
    },
    {
      id: 'EMPLOYER',
      title: 'Employer / Enterprise',
      badge: 'Hiring',
      badgeColor: 'badge-success',
      icon: Building2,
      description: 'Companies, startups, and enterprises seeking verified skilled workforce & apprentices.'
    },
    {
      id: 'INSTITUTE',
      title: 'Training Institute',
      badge: 'Skilling Partner',
      badgeColor: 'badge-neutral',
      icon: School,
      description: 'Colleges, ITIs, polytechnics, and vocational skill centers offering programs.'
    },
    {
      id: 'GOVERNMENT',
      title: 'Government Body',
      badge: 'Official Desk',
      badgeColor: 'badge-warning',
      icon: Landmark,
      description: 'State and central skill development missions, regulatory desks, and scheme authorities.'
    }
  ]

  const [selectedRole, setSelectedRole] = useState('CANDIDATE')
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organizationName: '',
    qualification: '',
    industrySector: '',
    designation: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [signupError, setSignupError] = useState(null)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    setSignupError(null)

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError('Passwords do not match')
      return
    }

    if (!signupForm.agreeTerms) {
      setSignupError('Please accept the portal terms and conditions')
      return
    }

    setSignupLoading(true)
    setTimeout(() => {
      setSignupLoading(false)
      setSignupSubmitted(true)
    }, 800)
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header info */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Unified National Skill Portal Registration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Create Your SkillVistaar Account
          </h2>
          <p className="subtext text-xs sm:text-sm">
            Select your participant role below to access tailored skilling, recruitment, or institutional features.
          </p>
        </div>

        {signupSubmitted ? (
          <div className="card p-8 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="heading-lg text-emerald-400">Registration Successful!</h3>
            <p className="subtext">
              Your <strong>{selectedRole}</strong> account on SkillVistaar has been created. A verification link has been sent to <strong>{signupForm.email}</strong>.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="btn-primary btn-md mt-4"
            >
              Proceed to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1. ROLE SELECTION CARDS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">
                  Step 1: Choose Your Participant Role <span className="text-rose-400">*</span>
                </span>
                <span className="text-xs text-surface-400">
                  Selected: <strong className="text-brand-300 font-semibold">{userRoles.find(r => r.id === selectedRole)?.title}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {userRoles.map((role) => {
                  const Icon = role.icon
                  const isSelected = selectedRole === role.id
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`card cursor-pointer p-4 transition-all duration-200 relative group flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-500 bg-brand-500/10 shadow-glow-sm ring-1 ring-brand-500/50'
                          : 'hover:border-surface-700 bg-surface-900/60'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-brand-500 text-white shadow-sm'
                                : 'bg-surface-800 text-surface-300 group-hover:text-white'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <span className={role.badgeColor}>
                              {role.badge}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {role.title}
                          </h4>
                          <p className="text-[11px] text-surface-400 mt-1 leading-snug">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 2. REGISTRATION FORM */}
            <div className="card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-800 pb-3">
                <h3 className="heading-md">
                  Step 2: Enter Registration Details for {userRoles.find(r => r.id === selectedRole)?.title}
                </h3>
                <p className="subtext text-xs">
                  All fields marked with <span className="text-rose-400">*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-5">
                {signupError && (
                  <div className="badge-danger text-xs p-3 rounded-lg block">
                    {signupError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name / Contact Person */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      {selectedRole === 'CANDIDATE' ? 'Full Name' : 'Authorized Contact Person'} <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={signupForm.fullName}
                        onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                        className="input pl-9"
                      />
                    </div>
                  </div>

                  {/* Organization / Institute / Department Name */}
                  {selectedRole !== 'CANDIDATE' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-surface-200">
                        {selectedRole === 'EMPLOYER' && 'Company / Enterprise Name'}
                        {selectedRole === 'INSTITUTE' && 'College / Institute Name'}
                        {selectedRole === 'GOVERNMENT' && 'Ministry / Department Name'} <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder={
                            selectedRole === 'EMPLOYER'
                              ? 'e.g. Tata Tech Solutions'
                              : selectedRole === 'INSTITUTE'
                              ? 'e.g. National Skill Institute'
                              : 'e.g. Directorate of Technical Education'
                          }
                          value={signupForm.organizationName}
                          onChange={(e) => setSignupForm({ ...signupForm, organizationName: e.target.value })}
                          className="input pl-9"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      {selectedRole === 'GOVERNMENT' ? 'Official Gov Email' : 'Email Address'} <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder={selectedRole === 'GOVERNMENT' ? 'officer@gov.in' : 'name@example.com'}
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        className="input pl-9"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      Mobile Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        className="input pl-9"
                      />
                    </div>
                  </div>

                  {/* Role Specific Field */}
                  {selectedRole === 'CANDIDATE' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-surface-200">
                        Highest Qualification / Current Status
                      </label>
                      <select
                        value={signupForm.qualification}
                        onChange={(e) => setSignupForm({ ...signupForm, qualification: e.target.value })}
                        className="input bg-surface-950"
                      >
                        <option value="">Select Qualification</option>
                        <option value="10th_12th">10th / 12th Pass</option>
                        <option value="diploma">Diploma / ITI Certified</option>
                        <option value="graduate">Graduate (B.Tech / B.Sc / B.A / B.Com)</option>
                        <option value="postgraduate">Post Graduate / Master's</option>
                        <option value="working">Working Professional</option>
                      </select>
                    </div>
                  )}

                  {selectedRole === 'EMPLOYER' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-surface-200">
                        Industry Sector
                      </label>
                      <select
                        value={signupForm.industrySector}
                        onChange={(e) => setSignupForm({ ...signupForm, industrySector: e.target.value })}
                        className="input bg-surface-950"
                      >
                        <option value="">Select Industry</option>
                        <option value="it_software">Information Technology & Software</option>
                        <option value="manufacturing">Manufacturing & Engineering</option>
                        <option value="renewable_energy">Solar & Renewable Energy</option>
                        <option value="healthcare">Healthcare & Life Sciences</option>
                        <option value="retail_logistics">Logistics & Supply Chain</option>
                        <option value="other">Other Commercial Sector</option>
                      </select>
                    </div>
                  )}

                  {selectedRole === 'GOVERNMENT' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-surface-200">
                        Official Designation <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Joint Director / Nodal Officer"
                        value={signupForm.designation}
                        onChange={(e) => setSignupForm({ ...signupForm, designation: e.target.value })}
                        className="input"
                      />
                    </div>
                  )}

                  {selectedRole === 'INSTITUTE' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-surface-200">
                        Accreditation / Affiliation Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. NCVT / AICTE / UGC Code"
                        value={signupForm.qualification}
                        onChange={(e) => setSignupForm({ ...signupForm, qualification: e.target.value })}
                        className="input"
                      />
                    </div>
                  )}

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      Password <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showSignupPassword ? 'text' : 'password'}
                        required
                        placeholder="Min. 8 characters"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        className="input pl-9 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-200"
                      >
                        {showSignupPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-surface-200">
                      Confirm Password <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showSignupPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        className="input pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Agree Terms */}
                <div className="pt-2">
                  <label className="flex items-start space-x-2 text-xs text-surface-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signupForm.agreeTerms}
                      onChange={(e) => setSignupForm({ ...signupForm, agreeTerms: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded border-surface-700 bg-surface-900 text-brand-600 focus:ring-brand-500"
                    />
                    <span>
                      I agree to the <strong>SkillVistaar Portal Terms of Service</strong>, Privacy Policy, and participant code of conduct.
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="btn-primary btn-lg w-full sm:w-auto"
                  >
                    {signupLoading ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>Register as {userRoles.find(r => r.id === selectedRole)?.title.split('/')[0]}</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                  <div className="text-xs text-surface-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('login')}
                      className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-4 ml-1"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Trust Footer */}
        <div className="flex items-center justify-center space-x-2 text-[11px] text-surface-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Unified National Skill Portal • Certified Data Privacy & Security</span>
        </div>
      </div>
    </main>
  )
}

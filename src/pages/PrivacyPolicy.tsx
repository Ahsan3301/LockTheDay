const PrivacyPolicy = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 py-16 text-slate-700 dark:text-slate-300">
      <h1 className="text-3xl font-serif font-bold mb-6 text-slate-800 dark:text-white">Privacy Policy</h1>

      <p className="mb-4">
        At Lock The Day, we deeply value your privacy. This policy outlines how we collect, use, and protect your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect minimal personal data required to deliver our service. This includes your email address and saved time capsules.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Data</h2>
      <p className="mb-4">
        Your data is used solely to operate the platform, send reminders, and allow access to your capsules. We never sell your data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
      <p className="mb-4">
        All your data is securely stored and encrypted using industry best practices via our Supabase backend.
      </p>

      <p className="mt-12 text-sm text-slate-500">Last updated: May 2025</p>
    </div>
  );
};

export default PrivacyPolicy;

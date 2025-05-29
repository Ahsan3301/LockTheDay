const TermsOfService = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 py-16 text-slate-700 dark:text-slate-300">
      <h1 className="text-3xl font-serif font-bold mb-6 text-slate-800 dark:text-white">Terms of Service</h1>

      <p className="mb-4">
        By using Lock The Day, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Account Responsibility</h2>
      <p className="mb-4">
        You are responsible for keeping your account secure and for all activities under it.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Content Ownership</h2>
      <p className="mb-4">
        You retain full ownership of the content you upload. We do not claim rights to your creations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend accounts violating our terms or engaging in harmful behavior.
      </p>

      <p className="mt-12 text-sm text-slate-500">Last updated: May 2025</p>
    </div>
  );
};

export default TermsOfService;

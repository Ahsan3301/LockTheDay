const Help = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 py-16 text-slate-700 dark:text-slate-300">
      <h1 className="text-3xl font-serif font-bold mb-6 text-slate-800 dark:text-white">Help & FAQ</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">How do I create a time capsule?</h2>
      <p className="mb-4">
        Click “Create Capsule” from the homepage. You can write a message, upload a photo, or draw something.
        Set an unlock date, and you’re done!
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Can I edit or delete my capsule?</h2>
      <p className="mb-4">
        You can edit or delete capsules before they’re locked. Once locked, capsules remain sealed until their unlock date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Is my data secure?</h2>
      <p className="mb-4">
        Absolutely. Your data is encrypted and stored securely via Supabase. Only you can access your private capsules.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Need further help?</h2>
      <p className="mb-4">
        Reach out to our support team at{" "}
        <a href="mailto:support@locktheday.com" className="text-lavender-600 hover:underline">
          support@locktheday.com
        </a>.
      </p>
    </div>
  );
};

export default Help;
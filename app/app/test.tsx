export default function TestPage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Test Page</h1>
      <p className="text-gray-700">
        If you can see this page at <code className="bg-gray-100 px-2 py-1 rounded">app.localhost:3000/test</code>, 
        then the app subdomain routing is working correctly!
      </p>
    </div>
  );
} 
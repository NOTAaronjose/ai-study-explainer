export default function ExplanationCard({ explanation }: any) {

  if (!explanation) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100 max-w-md">

      <h2 className="font-bold mb-2">
        Explanation
      </h2>

      <p>{explanation}</p>

    </div>
  );
}
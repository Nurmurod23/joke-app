
interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="Dad Jokes">Dad Jokes</option>
        <option value="Puns">Puns</option>
        <option value="One-liners">One-liners</option>
        <option value="Knock-knock">Knock-knock</option>
        <option value="Programming">Programming</option>
      </select>
    </div>
  );
}
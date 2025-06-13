// components/DistrictSelector.tsx
type Props = {
  districts: string[];
};

export const DistrictSelector = ({ districts }: Props) => {
  return (
    <div>
      <label htmlFor="district" className="block text-sm font-medium">
        District
      </label>
      <select
        id="district"
        name="district"
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your district</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

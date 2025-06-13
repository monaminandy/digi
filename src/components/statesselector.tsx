// components/StateSelector.tsx
type Props = {
  onChange: (value: string) => void;
};

export const StateSelector = ({ onChange }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor="state" className="block text-sm font-medium">
        State
      </label>
      <select
        id="state"
        name="state"
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your state</option>
        <option value="WB">West Bengal</option>
        <option value="MH">Maharashtra</option>
        <option value="DL">Delhi</option>
        <option value="KA">Karnataka</option>
        <option value="TN">Tamil Nadu</option>
        <option value="RJ">Rajasthan</option>
      </select>
    </div>
  );
};

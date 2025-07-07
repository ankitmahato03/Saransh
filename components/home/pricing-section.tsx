const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: ["5 PDF Summarise per month,"],
  },
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: ["5 PDF Summarise per month,"],
    timestamps: "1:54:38",

  },
];

const PricingCard = () => {
  return <div></div>;
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24  max-w-5xl mx-auto py-4 sm:px-6 lg:px-8 lg:pt-12">
        <div>
          <h2>Pricing</h2>
        </div>
        <div className=" relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {[].map((Plane) => (
            <PricingCard key={plans.id} {...plans} />
          ))}
        </div>
      </div>
    </section>
  );
}

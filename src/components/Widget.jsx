import { X, ChartNoAxesCombined } from "lucide-react";

const Widget = ({ widget, onRemove }) => {
  const showRemoveButton = !widget.isDefault;

  // Render Donut Chart
  const renderDonutChart = () => {
    const { data } = widget;
    const radius = 60;
    const strokeWidth = 20;
    const normalizedRadius = radius - strokeWidth * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;

    let currentAngle = 0;

    return (
      <div className="flex items-center justify-center p-4">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {data.items.map((item, index) => {
              const percentage = (item.value / data.total) * 100;
              const strokeDasharray = `${
                (percentage * circumference) / 100
              } ${circumference}`;
              const strokeDashoffset = (-currentAngle * circumference) / 100;
              currentAngle += percentage;

              return (
                <circle
                  key={index}
                  stroke={item.color}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-800">{data.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    const { data } = widget;
    const criticalPercentage = (data.items[0]?.value / data.total) * 100;
    const highPercentage = (data.items[1]?.value / data.total) * 100;

    return (
      <div className="p-4">
        <div className="mb-2">
          <div className="text-xl font-bold text-gray-800">{data.total}</div>
          <div className="text-sm text-gray-600">{widget.text}</div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-red-800 rounded-l-full"
            style={{ width: `${criticalPercentage}%` }}
          ></div>
          <div
            className="absolute top-0 h-full bg-red-500"
            style={{
              left: `${criticalPercentage}%`,
              width: `${highPercentage}%`,
            }}
          ></div>
          <div
            className="absolute top-0 h-full bg-yellow-400"
            style={{
              left: `${criticalPercentage + highPercentage}%`,
              width: `${100 - criticalPercentage - highPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Render Empty State
  const renderEmptyState = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-2 flex justify-center items-center text-gray-300">
          <ChartNoAxesCombined size={45} />
        </div>
        <div className="text-sm text-gray-500">No Graph data available!</div>
      </div>
    </div>
  );

  // Render Custom Text Content (for user-created widgets)
  const renderCustomContent = () => (
    <div className="p-6">
      <div className="text-center">
        <div className="text-gray-700 leading-relaxed">
          {widget.text.split("\n").map((line, index) => (
            <div key={index} className="mb-2">
              {line}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-400">Custom Widget</div>
        </div>
      </div>
    </div>
  );

  // Render Legend
  const renderLegend = () => {
    if (widget.type === "empty" || widget.type === "custom") return null;

    return (
      <div className="px-4 pb-4">
        <div className="space-y-2">
          {widget.data?.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="text-gray-600">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (widget.type) {
      case "donut":
        return renderDonutChart();
      case "progress":
        return renderProgressBar();
      case "empty":
        return renderEmptyState();
      case "custom":
        return renderCustomContent();
      default:
        return widget.isDefault ? renderEmptyState() : renderCustomContent();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Widget Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {widget.name}
          </h3>

          {showRemoveButton && (
            <button
              onClick={() => onRemove(widget.id)}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="Remove widget"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Widget Chart */}
      {renderChart()}

      {/* Widget Legend */}
      {renderLegend()}
    </div>
  );
};

export default Widget;

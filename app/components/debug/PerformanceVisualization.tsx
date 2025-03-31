import { useStore } from '@nanostores/react';
import { metricsStore } from '~/lib/stores/metrics';
import { useEffect, useRef } from 'react';

export function PerformanceVisualization() {
  const metrics = useStore(metricsStore);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = metrics.performance.slice(-30);

    // Draw metrics with labels
    drawMetricGraph(ctx, data, 'fps', 0, 100, '#22c55e', '#ef4444');
    drawMetricGraph(ctx, data, 'memoryUsage', 100, 200, '#3b82f6', '#f59e0b');
    drawMetricGraph(ctx, data, 'networkLatency', 200, 300, '#8b5cf6', '#ef4444');

    // Add legends
    drawLegends(ctx);
  }, [metrics]);

  const drawMetricGraph = (
    ctx: CanvasRenderingContext2D,
    data: PerformanceMetrics[],
    metric: keyof PerformanceMetrics,
    startY: number,
    endY: number,
    normalColor: string,
    alertColor: string,
  ) => {
    data.forEach((point, i) => {
      const value = point[metric] as number;
      const isAlert = shouldShowAlert(metric, value);
      ctx.fillStyle = isAlert ? alertColor : normalColor;
      const height = normalizeValue(value, metric);
      ctx.fillRect(i * 20, endY - height, 15, height);
    });
  };

  const drawLegends = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '12px Inter';
    ctx.fillStyle = '#64748b';
    ctx.fillText('FPS', 10, 20);
    ctx.fillText('Memory (MB)', 10, 120);
    ctx.fillText('Latency (ms)', 10, 220);
  };

  return (
    <div className="p-4 bg-bolt-elements-background-depth-2 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
      <canvas ref={canvasRef} width={600} height={300} className="w-full" />
      <div className="mt-4 text-sm text-bolt-elements-textSecondary">Last 30 seconds of metrics</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getOverviewData } from "../../services/api";

import { Wrapper, Grid, Card, Value, Label } from "./styles";
import { formatUptime } from "../../formatter/formatUptime";

type OverviewData = {
  cpuUsage: number;

  memoryUsage: number;
  memoryTotal: string;
  memoryUsed: string;

  storageUsage: number;
  storageTotal: string;
  storageUsed: string;

  uptime: number;
};

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    getOverviewData().then(setData);
  }, []);

  if (!data) return null;

  return (
    <Wrapper>
      <Grid>
        <Card>
          <Value>{data.cpuUsage}%</Value>
          <Label>CPU (%)</Label>
        </Card>

        <Card>
          <Value>{data.memoryUsage}%</Value>
          <Label>MEMÓRIA (%)</Label>
        </Card>

        <Card>
          <Value>{data.memoryTotal}</Value>
          <Label>MEMÓRIA TOTAL</Label>
        </Card>

        <Card>
          <Value>{data.storageUsed}</Value>
          <Label>HD USADO</Label>
        </Card>

        <Card>
          <Value>{data.storageTotal}</Value>
          <Label>HD TOTAL</Label>
        </Card>

        <Card>
          <Value>{formatUptime(data.uptime)}</Value>
          <Label>UPTIME</Label>
        </Card>
      </Grid>
    </Wrapper>
  );
}

import { GetOrgInfo } from './GetOrgInfo';
import { GetFlowCoverage } from './GetFlowCoverage';
import { GetFlowDefinitionViews } from './GetFlowDefinitionViews';

export async function findFlowCoverage(results): Promise<Map<string, number>> {
  const flowCoverageMap = new Map<string, number>();

  try {
    const orgInfo = await new GetOrgInfo().getOrgInfo();
    if (orgInfo && orgInfo.result && orgInfo.result.username) {
      const flowCoverage = await new GetFlowCoverage().getFlowCoverage(
        orgInfo.result.username
      );
      const flowDefinitions =
        await new GetFlowDefinitionViews().getFlowDefinitionViews(
          orgInfo.result.username
        );

      for (const scanResult of results) {
        try {
          const matchingFlowDefinition = flowDefinitions.result.records.find(
            (record) => scanResult.flow.name === record.ApiName
          );
          if (matchingFlowDefinition) {
            const matchingFlowCoverage = flowCoverage.result.records.find(
              (record) =>
                matchingFlowDefinition.ActiveVersionId === record.FlowVersionId
            );
            const coverage = matchingFlowCoverage
              ? (matchingFlowCoverage.NumElementsCovered /
                  (matchingFlowCoverage.NumElementsCovered +
                    matchingFlowCoverage.NumElementsNotCovered)) *
                100
              : 0;
            flowCoverageMap.set(scanResult.flow.name, coverage);
          } else {
            flowCoverageMap.set(scanResult.flow.name, 0);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          flowCoverageMap.set(scanResult.flow.name, 0);
        }
      }
    } else {
      for (const scanResult of results) {
        flowCoverageMap.set(scanResult.flow.name, 0);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (exception) {
    for (const scanResult of results) {
      flowCoverageMap.set(scanResult.flow.name, 0);
    }
  }

  return flowCoverageMap;
}

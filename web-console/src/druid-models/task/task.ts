/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { StageDefinition } from '../stages/stages';

export type TaskStatus = 'WAITING' | 'PENDING' | 'RUNNING' | 'FAILED' | 'SUCCESS';
export type TaskStatusWithCanceled = TaskStatus | 'CANCELED';

export interface TaskStatusResponse {
  task: string;
  status: {
    status: TaskStatus;
    error?: any;
  };
}

export interface MsqTaskPayloadResponse {
  task: string;
  payload: {
    type: 'query_controller';
    id: string;
    spec: {
      query: Record<string, any>;
      columnMappings: {
        queryColumn: string;
        outputColumn: string;
      }[];
      destination:
        | {
            type: 'taskReport';
          }
        | {
            type: 'dataSource';
            dataSource: string;
            segmentGranularity: string | { type: string };
            replaceTimeChunks: string[];
          };
      assignmentStrategy: 'max' | 'auto';
      tuningConfig: Record<string, any>;
    };
    sqlQuery: string;
    sqlQueryContext: Record<string, any>;
    sqlResultsContext: Record<string, any>;
    sqlTypeNames: string[];
    context: Record<string, any>;
    groupId: string;
    dataSource: string;
    resource: {
      availabilityGroup: string;
      requiredCapacity: number;
    };
  };
}

export interface MsqTaskReportResponse {
  multiStageQuery: {
    type: 'multiStageQuery';
    taskId: string;
    payload: {
      status: {
        status: string;
        errorReport?: MsqTaskErrorReport;
        warnings?: MsqTaskErrorReport[];
        startTime: string;
        durationMs: number;
        pendingTasks: number;
        runningTasks: number;
      };
      stages: StageDefinition[];
      counters: Record<string, Record<string, any>>;
    };
  };
  error?: any;
}

export interface MsqTaskErrorReport {
  taskId: string;
  host: string;
  error: {
    errorCode: string;
    errorMessage: string;
    maxWarnings?: number;
    rootErrorCode?: string;
  };
  stageNumber?: number;
  exceptionStackTrace?: string;
}

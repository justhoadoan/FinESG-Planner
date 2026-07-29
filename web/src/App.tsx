import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CaseList } from '@/surfaces/CaseList';
import { CaseOverview } from '@/surfaces/CaseOverview';
import { BctcReconcile } from '@/surfaces/BctcReconcile';
import { Scenario } from '@/surfaces/Scenario';
import { Funding } from '@/surfaces/Funding';
import { Projects } from '@/surfaces/Projects';
import { Optimize } from '@/surfaces/Optimize';
import { Results } from '@/surfaces/Results';
import { Evidence } from '@/surfaces/Evidence';

const router = createBrowserRouter([
  { path: '/', element: <CaseList /> },
  { path: '/cases/:caseId/', element: <CaseOverview /> },
  { path: '/cases/:caseId/bctc', element: <BctcReconcile /> },
  { path: '/cases/:caseId/scenario', element: <Scenario /> },
  { path: '/cases/:caseId/funding', element: <Funding /> },
  { path: '/cases/:caseId/projects', element: <Projects /> },
  { path: '/cases/:caseId/optimize', element: <Optimize /> },
  { path: '/cases/:caseId/results', element: <Results /> },
  { path: '/cases/:caseId/evidence', element: <Evidence /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}

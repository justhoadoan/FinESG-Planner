import { useParams } from 'react-router-dom';
import { getCase } from '@/api/stub';
import { useAsync } from '@/lib/useAsync';
import { AppShell } from '@/components/AppShell';
import { EmptyState, PageHeading } from '@/components/primitives';

/**
 * Surface tạm cho các bước chưa dựng ở giai đoạn FE-first.
 *
 * Nêu thẳng surface này chưa hiện thực và thuộc epic nào — không giả vờ hoàn
 * thiện. Khi tới lượt build từng màn, thay bằng surface thật.
 */
export function Placeholder({ surface, epic }: { surface: string; epic: string }) {
  const { caseId = '' } = useParams();
  const caseState = useAsync(() => getCase(caseId), [caseId]);

  return (
    <AppShell activeCase={caseState.status === 'ready' ? caseState.data : undefined}>
      <PageHeading title={surface} />
      <EmptyState
        title="Màn này chưa được dựng"
        body={`Bề mặt "${surface}" thuộc ${epic}. Giai đoạn FE-first hiện đang hoàn thiện S01 (Danh sách Hồ sơ) và S03 (Tổng quan & mức sẵn sàng) trước; các màn còn lại sẽ được dựng theo thứ tự epic.`}
      />
    </AppShell>
  );
}

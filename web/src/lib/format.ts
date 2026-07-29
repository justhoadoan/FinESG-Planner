/**
 * Định dạng hiển thị. TẠM ở FE cho giai đoạn FE-first.
 *
 * AD-19 yêu cầu quy tắc định dạng số đến từ catalog nhãn của backend để React
 * và WeasyPrint không làm tròn khác nhau. Khi endpoint có, thay các hàm này
 * bằng quy tắc từ catalog. Hiện dùng locale vi-VN.
 */

const dateFmt = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${dateFmt.format(d)} ${d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

import { useState, useEffect } from 'react';
import { getJSON, postJSON, putJSON, delJSON } from './api';

// 通用增删改查：读列表（带离线兜底）+ 新建/编辑/删除
export function useCrud(resource, fallback) {
  const [rows, setRows] = useState(fallback);
  const [live, setLive] = useState(false);

  useEffect(() => {
    getJSON(`/api/${resource}`)
      .then((d) => { if (Array.isArray(d) && d.length) { setRows(d); setLive(true); } })
      .catch(() => {});
  }, [resource]);

  const create = async (data) => {
    const r = await postJSON(`/api/${resource}`, data);
    setRows((rs) => [r, ...rs]);
    return r;
  };
  const update = async (id, data) => {
    const r = await putJSON(`/api/${resource}/${id}`, data);
    setRows((rs) => rs.map((x) => (x.id === id ? r : x)));
    return r;
  };
  const remove = async (id) => {
    await delJSON(`/api/${resource}/${id}`);
    setRows((rs) => rs.filter((x) => x.id !== id));
  };

  return { rows, setRows, live, create, update, remove };
}

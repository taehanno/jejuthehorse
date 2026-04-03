const translations = {
  ko: {
    // Header
    subtitle: '승마 체험 예약',
    // Gallery
    galleryTitle: '제주 더 홀스 목장',
    gallerySub: '제주 애월의 자연 속에서 즐기는 승마 체험',
    // Date
    dateLabel: '날짜 선택',
    datePlaceholder: '시간을 선택해주세요',
    dateNote: '* 월요일은 휴무입니다',
    dateError: '날짜를 선택해주세요.',
    dateMondayError: '월요일은 휴무일입니다. 다른 날을 선택해주세요.',
    // Time
    timeLabel: '시간 선택',
    timePlaceholder: '시간을 선택해주세요',
    timeError: '시간을 선택해주세요.',
    // Persons
    personsLabel: '인원 정보',
    addPerson: '+ 인원 추가',
    personsError: '모든 인원의 코스 또는 1회 기승 체험을 선택해주세요.',
    // PersonCard
    person: '인원',
    ageLabel: '연령',
    adult: '성인',
    child: '아동',
    orDivider: '코스 또는 1회 기승 체험 중 선택',
    courseSection: '🐎 코스 체험',
    horseSection: '🏇 1회 기승 체험',
    forestAdd: '숲길 추가',
    courses: [
      { value: 'A', label: '체험A', sub: '둘레길', duration: '10-15분', price: '33,000원' },
      { value: 'B', label: '체험B', sub: '목장길', duration: '20-25분', price: '66,000원' },
      { value: 'C', label: '체험C', sub: '목장둘레길', duration: '30-35분', price: '99,000원' },
    ],
    horses: [
      { value: '한라마', label: '한라마', price: '110,000원' },
      { value: '웜블러드', label: '웜블러드', price: '132,000원' },
    ],
    // Summary
    summaryTitle: '예약 요약',
    totalPersons: '총 인원',
    totalPrice: '총 금액',
    personUnit: '명',
    priceUnit: '원',
    // Customer
    customerTitle: '예약자 정보',
    nameLabel: '성함',
    namePlaceholder: '홍길동',
    nameError: '예약자 성함을 입력해주세요.',
    phoneLabel: '연락처',
    phonePlaceholder: '010-0000-0000',
    phoneError: '연락처를 입력해주세요.',
    // Submit
    submitBtn: '예약 요청 보내기',
    submitting: '전송 중...',
    submitError: '예약 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
    // Directions
    directionsTitle: '찾아오시는 길',
    directionsAddr: '제주 제주시 애월읍 산록서로 81',
    directionsDesc: '노꼬스시에서 승마장 표지판을 따라\n파란 지붕 승마장으로 내려오세요',
    mapLink: '카카오맵에서 보기 →',
    // Complete
    completeTitle: '예약 접수 완료!',
    completeSub: '곧 연락드리겠습니다',
    detailTitle: '예약 상세',
    labelReserver: '예약자',
    labelPhone: '연락처',
    labelDate: '날짜',
    labelTime: '시간',
    labelTotalPersons: '총 인원',
    breakdownTitle: '인원별 내역',
    noteTitle: '안내사항',
    noteText: '예약 확정은 담당자 확인 후 전화/문자로 안내드립니다.',
    noteContact: '문의: 010-2732-3666',
    // Footer
    footerAddr: '제주 제주시 애월읍 상가리 2156-15',
    footerPhone: '010-2732-3666',
    footerHours: '화~토 09:00~18:00 (휴게 12:00~13:20) / 월 휴무',
  },

  zh: {
    // Header
    subtitle: '骑马体验预约',
    // Gallery
    galleryTitle: '济州 The Horse 牧场',
    gallerySub: '在济州涯月的大自然中享受骑马体验',
    // Date
    dateLabel: '选择日期',
    datePlaceholder: '请选择日期',
    dateNote: '* 周一休息',
    dateError: '请选择日期。',
    dateMondayError: '周一为休息日，请选择其他日期。',
    // Time
    timeLabel: '选择时间',
    timePlaceholder: '请选择时间',
    timeError: '请选择时间。',
    // Persons
    personsLabel: '人员信息',
    addPerson: '+ 添加人员',
    personsError: '请为所有人员选择课程或单次骑乘体验。',
    // PersonCard
    person: '人员',
    ageLabel: '年龄',
    adult: '成人',
    child: '儿童',
    orDivider: '请选择课程或单次骑乘体验',
    courseSection: '🐎 课程体验',
    horseSection: '🏇 单次骑乘体验',
    forestAdd: '添加森林路线',
    courses: [
      { value: 'A', label: '体验A', sub: '环形路线', duration: '10-15分钟', price: '33,000韩元' },
      { value: 'B', label: '体验B', sub: '牧场路线', duration: '20-25分钟', price: '66,000韩元' },
      { value: 'C', label: '体验C', sub: '牧场环形路线', duration: '30-35分钟', price: '99,000韩元' },
    ],
    horses: [
      { value: '한라마', label: '汉拿马', price: '110,000韩元' },
      { value: '웜블러드', label: '温血马', price: '132,000韩元' },
    ],
    // Summary
    summaryTitle: '预约摘要',
    totalPersons: '总人数',
    totalPrice: '总金额',
    personUnit: '人',
    priceUnit: '韩元',
    // Customer
    customerTitle: '预约者信息',
    nameLabel: '姓名',
    namePlaceholder: '请输入姓名',
    nameError: '请输入预约者姓名。',
    phoneLabel: '联系电话',
    phonePlaceholder: '010-0000-0000',
    phoneError: '请输入联系电话。',
    // Submit
    submitBtn: '发送预约请求',
    submitting: '发送中...',
    submitError: '预约发送失败，请稍后重试。',
    // Directions
    directionsTitle: '来场路线',
    directionsAddr: '济州市涯月邑山麓西路81号',
    directionsDesc: '从노꼬스시沿骑马场指示牌\n前往蓝色屋顶骑马场',
    mapLink: '查看地图 →',
    // Complete
    completeTitle: '预约受理完成！',
    completeSub: '我们将尽快与您联系',
    detailTitle: '预约详情',
    labelReserver: '预约者',
    labelPhone: '联系电话',
    labelDate: '日期',
    labelTime: '时间',
    labelTotalPersons: '总人数',
    breakdownTitle: '人员明细',
    noteTitle: '注意事项',
    noteText: '预约确认后将通过电话/短信通知您。',
    noteContact: '咨询: 010-2732-3666',
    // Footer
    footerAddr: '济州市涯月邑上加里2156-15',
    footerPhone: '010-2732-3666',
    footerHours: '周二~周六 09:00~18:00 (休息 12:00~13:20) / 周一休息',
  },
}

export default translations

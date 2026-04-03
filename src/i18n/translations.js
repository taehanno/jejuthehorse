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
    ageNoticeChild: '만 48개월(4세) 이상부터 체험 가능합니다.\n만 48개월 미만 어린이는 예약 전 전화로 문의해 주세요.',
    ageNoticeAdult: '만 60세 이상이신 경우, 안전을 위해 예약 전 전화로 문의해 주세요.',
    ageNoticeCommon: '현재 질병 치료·약물 복용 중이거나 신체 불편이 있으신 분은 이용이 어렵습니다.',
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
    completeTitle: '예약 신청이 완료되었습니다',
    completeSub: '아직 예약이 확정된 것이 아닙니다',
    detailTitle: '예약 상세',
    labelReserver: '예약자',
    labelPhone: '연락처',
    labelDate: '날짜',
    labelTime: '시간',
    labelTotalPersons: '총 인원',
    breakdownTitle: '인원별 내역',
    noteTitle: '⚠️ 반드시 확인해주세요',
    noteText: '현재는 신청만 완료된 상태입니다. 담당자 확인 후 전화 또는 문자로 예약 확정 안내를 드립니다.',
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
    ageNoticeChild: '建议48个月（4岁）以上儿童参与。\n48个月以下儿童请在预约前来电咨询。',
    ageNoticeAdult: '60岁以上顾客为了安全起见，请在预约前来电咨询。',
    ageNoticeCommon: '正在接受疾病治疗、服药中或身体不便者无法参与体验。',
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
    completeTitle: '预约申请已提交',
    completeSub: '预约尚未确认，请等待工作人员联系',
    detailTitle: '预约详情',
    labelReserver: '预约者',
    labelPhone: '联系电话',
    labelDate: '日期',
    labelTime: '时间',
    labelTotalPersons: '总人数',
    breakdownTitle: '人员明细',
    noteTitle: '⚠️ 请注意',
    noteText: '目前仅完成了申请，预约尚未确认。工作人员确认后将通过电话或短信通知您预约确认结果。',
    noteContact: '咨询: 010-2732-3666',
    // Footer
    footerAddr: '济州市涯月邑上加里2156-15',
    footerPhone: '010-2732-3666',
    footerHours: '周二~周六 09:00~18:00 (休息 12:00~13:20) / 周一休息',
  },
  en: {
    // Header
    subtitle: 'Horse Riding Reservation',
    // Gallery
    galleryTitle: 'Jeju The Horse Ranch',
    gallerySub: 'Horse riding experience in the nature of Aewol, Jeju',
    // Date
    dateLabel: 'Select Date',
    datePlaceholder: 'Select a date',
    dateNote: '* Closed on Mondays',
    dateError: 'Please select a date.',
    dateMondayError: 'We are closed on Mondays. Please choose another date.',
    // Time
    timeLabel: 'Select Time',
    timePlaceholder: 'Select a time',
    timeError: 'Please select a time.',
    // Persons
    personsLabel: 'Participants',
    addPerson: '+ Add Person',
    personsError: 'Please select a course or single ride for every person.',
    // PersonCard
    person: 'Person',
    ageLabel: 'Age Group',
    adult: 'Adult',
    child: 'Child',
    ageNoticeChild: 'Recommended for children 48 months (4 years) and older.\nFor children under 48 months, please contact us before booking.',
    ageNoticeAdult: 'Guests aged 60 or older are asked to contact us before booking for safety reasons.',
    ageNoticeCommon: 'Participation is not available for those with medical conditions, on medication, or with physical limitations.',
    orDivider: 'Choose a course or single ride experience',
    courseSection: '🐎 Course Experience',
    horseSection: '🏇 Single Ride Experience',
    forestAdd: 'Forest Trail',
    courses: [
      { value: 'A', label: 'Course A', sub: 'Loop Trail', duration: '10-15 min', price: '₩33,000' },
      { value: 'B', label: 'Course B', sub: 'Ranch Trail', duration: '20-25 min', price: '₩66,000' },
      { value: 'C', label: 'Course C', sub: 'Ranch Loop', duration: '30-35 min', price: '₩99,000' },
    ],
    horses: [
      { value: '한라마', label: 'Halla Horse', price: '₩110,000' },
      { value: '웜블러드', label: 'Warmblood', price: '₩132,000' },
    ],
    // Summary
    summaryTitle: 'Booking Summary',
    totalPersons: 'Total Persons',
    totalPrice: 'Total Price',
    personUnit: '',
    priceUnit: '',
    // Customer
    customerTitle: 'Contact Information',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'Please enter your name.',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '010-0000-0000',
    phoneError: 'Please enter your phone number.',
    // Submit
    submitBtn: 'Send Reservation Request',
    submitting: 'Sending...',
    submitError: 'Failed to send reservation. Please try again.',
    // Directions
    directionsTitle: 'Getting Here',
    directionsAddr: '81 Sanrokso-ro, Aewol-eup, Jeju City',
    directionsDesc: 'From Nocosse, follow the riding ranch signs\ndown to the blue-roofed ranch',
    mapLink: 'View on Map →',
    // Complete
    completeTitle: 'Reservation Request Submitted',
    completeSub: 'Your booking is not yet confirmed',
    detailTitle: 'Booking Details',
    labelReserver: 'Name',
    labelPhone: 'Phone',
    labelDate: 'Date',
    labelTime: 'Time',
    labelTotalPersons: 'Total',
    breakdownTitle: 'Per Person Breakdown',
    noteTitle: '⚠️ Please Read Carefully',
    noteText: 'This is a request only — your reservation is NOT yet confirmed. Our staff will contact you by call or text to confirm.',
    noteContact: 'Inquiry: 010-2732-3666',
    // Footer
    footerAddr: '2156-15 Sangga-ri, Aewol-eup, Jeju City',
    footerPhone: '010-2732-3666',
    footerHours: 'Tue–Sat 09:00–18:00 (Break 12:00–13:20) / Closed Mon',
  },
}

export default translations

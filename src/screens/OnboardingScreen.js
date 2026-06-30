import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Pressable, TextInput, Animated, Easing, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppText from '../components/AppText';
import PalMascot from '../components/PalMascot';
import PrimaryButton from '../components/PrimaryButton';
import { useUser } from '../context/UserContext';
import { colors, fonts, radius, shadow } from '../theme';

const STEPS = [
  {
    id: 'goal',
    type: 'single',
    title: 'What brings you to PCOS Pal?',
    subtitle: "We'll tailor your plan to your main goal.",
    options: [
      { label: 'Lose weight', emoji: '⚖️' },
      { label: 'Balance my hormones', emoji: '🌸' },
      { label: 'Boost fertility', emoji: '🤰' },
      { label: 'Manage my symptoms', emoji: '💪' },
    ],
  },
  {
    id: 'symptoms',
    type: 'multi',
    title: 'Which symptoms affect you most?',
    subtitle: 'Select all that apply.',
    options: [
      { label: 'Irregular periods', emoji: '📅' },
      { label: 'Weight gain', emoji: '🍔' },
      { label: 'Acne or skin', emoji: '✨' },
      { label: 'Fatigue', emoji: '😴' },
      { label: 'Cravings', emoji: '🍫' },
      { label: 'Hair changes', emoji: '💇‍♀️' },
    ],
  },
  {
    id: 'diagnosed',
    type: 'single',
    title: 'When were you diagnosed?',
    subtitle: "It's okay if you're still figuring things out.",
    options: [
      { label: 'Just exploring', emoji: '🔎' },
      { label: 'Less than a year ago', emoji: '🌱' },
      { label: '1–3 years ago', emoji: '📈' },
      { label: 'More than 3 years ago', emoji: '🗓️' },
    ],
  },
  {
    id: 'activity',
    type: 'single',
    title: 'How active are you?',
    subtitle: "We'll adapt your workouts to fit.",
    options: [
      { label: 'Mostly sedentary', emoji: '🛋️' },
      { label: 'Lightly active', emoji: '🚶‍♀️' },
      { label: 'Active', emoji: '🏃‍♀️' },
      { label: 'Very active', emoji: '🔥' },
    ],
  },
  {
    id: 'name',
    type: 'input',
    title: 'Last thing — what should we call you?',
    subtitle: 'Your plan will be personalized to you.',
    placeholder: 'Your first name',
  },
];

const BUILD_STEPS = [
  'Analyzing your symptoms',
  'Building your meal plan',
  'Personalizing your lessons',
  'Adapting your workouts',
  'Finalizing your plan',
];

function OptionRow({ option, selected, multi, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: selected ? colors.primarySoft : colors.card,
          borderRadius: radius.lg,
          padding: 16,
          marginBottom: 12,
          borderWidth: 2,
          borderColor: selected ? colors.primary : 'transparent',
        },
        shadow.soft,
      ]}
    >
      <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={{ fontSize: 20 }}>{option.emoji}</AppText>
      </View>
      <AppText font={fonts.bodyExtraBold} color={selected ? colors.primary : colors.textPrimary} style={{ fontSize: 16, flex: 1, marginLeft: 14 }}>
        {option.label}
      </AppText>
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: multi ? 8 : 13,
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.track,
          backgroundColor: selected ? colors.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? <Ionicons name="checkmark" size={16} color={colors.white} /> : null}
      </View>
    </Pressable>
  );
}

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { updateProfile } = useUser();
  const [phase, setPhase] = useState('quiz'); // quiz | building | ready
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');
  const [buildIndex, setBuildIndex] = useState(0);

  const progress = useRef(new Animated.Value(1 / STEPS.length)).current;

  useEffect(() => {
    const target = phase === 'quiz' ? (step + 1) / STEPS.length : 1;
    Animated.timing(progress, { toValue: target, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [step, phase]);

  // Build phase animation: reveal items one by one, then move to "ready".
  useEffect(() => {
    if (phase !== 'building') return;
    setBuildIndex(0);
    const interval = setInterval(() => {
      setBuildIndex((i) => {
        if (i >= BUILD_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setPhase('ready'), 700);
          return i;
        }
        return i + 1;
      });
    }, 650);
    return () => clearInterval(interval);
  }, [phase]);

  const current = STEPS[step];

  const back = () => {
    if (phase !== 'quiz') return;
    if (step === 0) navigation.goBack();
    else setStep(step - 1);
  };

  const goNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setPhase('building');
  };

  const selectSingle = (label) => {
    setAnswers((a) => ({ ...a, [current.id]: label }));
    setTimeout(goNext, 220);
  };

  const toggleMulti = (label) => {
    setAnswers((a) => {
      const list = a[current.id] || [];
      const next = list.includes(label) ? list.filter((l) => l !== label) : [...list, label];
      return { ...a, [current.id]: next };
    });
  };

  // ---------- BUILDING ----------
  if (phase === 'building') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + 40, alignItems: 'center' }}>
        <StatusBar style="dark" />
        <View style={[{ backgroundColor: colors.primarySoft, borderRadius: 40, padding: 10 }, shadow.soft]}>
          <PalMascot size={96} />
        </View>
        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26, marginTop: 28, textAlign: 'center', paddingHorizontal: 30 }}>
          Building your plan
        </AppText>
        <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 15, marginTop: 8 }}>
          This will only take a moment…
        </AppText>

        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 34 }}>
          {BUILD_STEPS.map((b, i) => {
            const done = i < buildIndex;
            const active = i === buildIndex;
            return (
              <View key={b} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, opacity: done || active ? 1 : 0.4 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: done ? colors.success : active ? colors.primary : colors.track,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={done ? 'checkmark' : 'ellipsis-horizontal'} size={15} color={colors.white} />
                </View>
                <AppText font={fonts.bodyBold} color={done || active ? colors.textPrimary : colors.textMuted} style={{ fontSize: 15, marginLeft: 14 }}>
                  {b}
                </AppText>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  // ---------- READY ----------
  if (phase === 'ready') {
    const goal = answers.goal || 'Manage my symptoms';
    const symptomCount = (answers.symptoms || []).length;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + 30, paddingBottom: insets.bottom + 24, paddingHorizontal: 28, alignItems: 'center', justifyContent: 'space-between' }}>
        <StatusBar style="dark" />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={[{ backgroundColor: colors.primarySoft, borderRadius: 44, padding: 12 }, shadow.soft]}>
            <PalMascot size={104} />
          </View>
          <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 30, marginTop: 26, textAlign: 'center' }}>
            You're all set{name ? `, ${name}` : ''}!
          </AppText>
          <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 15, marginTop: 10, textAlign: 'center', lineHeight: 22 }}>
            Your personalized PCOS plan is ready, built around your goal and symptoms.
          </AppText>

          <View style={{ marginTop: 22, width: '100%' }}>
            {[
              { icon: 'flag', label: `Goal: ${goal}` },
              { icon: 'pulse', label: `${symptomCount || 'Key'} symptom${symptomCount === 1 ? '' : 's'} tracked` },
              { icon: 'restaurant', label: 'PCOS-friendly meal plan' },
              { icon: 'book', label: '14-day lesson journey' },
            ].map((r) => (
              <View key={r.label} style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radius.lg, padding: 14, marginBottom: 10 }, shadow.soft]}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={r.icon} size={18} color={colors.primary} />
                </View>
                <AppText font={fonts.bodyBold} color={colors.textPrimary} style={{ fontSize: 15, marginLeft: 12, flex: 1 }}>
                  {r.label}
                </AppText>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton
          label="Start my journey"
          icon="sparkles"
          onPress={() => {
            updateProfile({
              name: name.trim() || 'Friend',
              goal: answers.goal,
              symptoms: answers.symptoms || [],
              diagnosed: answers.diagnosed,
              activity: answers.activity,
              onboarded: true,
            });
            navigation.replace('Main');
          }}
          style={{ width: '100%' }}
        />
      </View>
    );
  }

  // ---------- QUIZ ----------
  const multiSelected = answers[current.id] || [];
  const canContinue = current.type === 'multi' ? multiSelected.length > 0 : name.trim().length > 0;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, flex: 1 }}>
        {/* Top bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
          <Pressable onPress={back} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow.soft }}>
            <Ionicons name="chevron-back" size={22} color={colors.heading} />
          </Pressable>
          <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.track, marginLeft: 16, overflow: 'hidden' }}>
            <Animated.View style={{ height: '100%', borderRadius: 4, backgroundColor: colors.primary, width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }} />
          </View>
          <AppText font={fonts.bodyBold} color={colors.textMuted} style={{ fontSize: 13, marginLeft: 12 }}>
            {step + 1}/{STEPS.length}
          </AppText>
        </View>

        <AppText font={fonts.serif} color={colors.heading} style={{ fontSize: 26, lineHeight: 32 }}>
          {current.title}
        </AppText>
        <AppText font={fonts.body} color={colors.textSecondary} style={{ fontSize: 15, marginTop: 8, marginBottom: 22 }}>
          {current.subtitle}
        </AppText>

        {current.type === 'input' ? (
          <View>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={current.placeholder}
              placeholderTextColor={colors.textMuted}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => canContinue && goNext()}
              style={{ backgroundColor: colors.card, borderRadius: radius.lg, paddingHorizontal: 18, paddingVertical: 16, fontSize: 17, fontFamily: fonts.bodyBold, color: colors.textPrimary, borderWidth: 2, borderColor: colors.primarySoft, ...shadow.soft }}
            />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {current.options.map((opt) => {
              const selected = current.type === 'multi' ? multiSelected.includes(opt.label) : answers[current.id] === opt.label;
              return (
                <OptionRow
                  key={opt.label}
                  option={opt}
                  selected={selected}
                  multi={current.type === 'multi'}
                  onPress={() => (current.type === 'multi' ? toggleMulti(opt.label) : selectSingle(opt.label))}
                />
              );
            })}
          </ScrollView>
        )}
      </View>

      {(current.type === 'multi' || current.type === 'input') && (
        <View style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 16, paddingTop: 8 }}>
          <PrimaryButton label="Continue" onPress={() => canContinue && goNext()} style={{ opacity: canContinue ? 1 : 0.4 }} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

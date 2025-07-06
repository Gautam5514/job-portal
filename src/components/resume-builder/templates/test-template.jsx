// src/components/resume-builder/templates/test-template.jsx

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font, Svg, Path } from '@react-pdf/renderer';

// --- FONT REGISTRATION ---
Font.register({
  family: 'Lato',
  fonts: [
    { src: '/fonts/Lato-Regular.ttf' },
    { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Lato-Italic.ttf', fontStyle: 'italic' },
  ],
});

// --- STYLESHEET ---
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Lato',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 15,
  },
  nameTitleWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    marginBottom: 10,
    lineHeight: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  title: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    fontSize: 9,
    color: '#6b7280',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  link: {
    color: '#6b7280',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  descriptionList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  descriptionItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  icon: {
    marginRight: 6,
    height: 10,
    width: 10,
  },
  titleIcon: {
    marginRight: 8,
    height: 11,
    width: 11,
  }
});

// --- HELPER COMPONENTS ---
const Icon = ({ path, style }) => (
  <Svg viewBox="0 0 24 24" style={[styles.icon, style]}>
    <Path d={path} fill="currentColor" />
  </Svg>
);

const MailIcon = () => <Icon path="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />;
const PhoneIcon = () => <Icon path="M19.95 21a2 2 0 0 1-1.45-.66L15.9 17.7a2.01 2.01 0 0 1-.55-1.42V14.5a1 1 0 0 0-1-1H13a1 1 0 0 0-1 1v1.28a2 2 0 0 1-.55 1.41l-2.6 2.6a2 2 0 0 1-2.82 0L3 16.67a2 2 0 0 1 0-2.82l5.67-5.66a2 2 0 0 1 2.82 0L14.1 10.8a1 1 0 0 0 1.41 0l3.54-3.54a1 1 0 0 0 0-1.41L16.46 3.2a2 2 0 0 1 0-2.82 2 2 0 0 1 2.83 0l2.09 2.09a2 2 0 0 1 0 2.82L17.8 8.88a1 1 0 0 0 0 1.41l3.54 3.54a1 1 0 0 0 1.41 0l2.59-2.59a2 2 0 0 1 2.83 0l.07.07a2 2 0 0 1 0 2.82l-3.24 3.25a2 2 0 0 1-1.42.55z" />;
const LinkedinIcon = () => <Icon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M6 9H2V21h4V9z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />;
const GithubIcon = () => <Icon path="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />;
const GlobeIcon = () => <Icon path="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />;
const MapPinIcon = () => <Icon path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />;
const BriefcaseIcon = () => <Icon path="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" style={styles.titleIcon}/>;
const GraduationCapIcon = () => <Icon path="M21.43 9.77l-9-4.5a.5.5 0 0 0-.43 0l-9 4.5a.5.5 0 0 0 0 .91l2.54 1.27c.13.07.29.07.43 0l5.46-2.73a.5.5 0 0 1 .43.91l-5.46 2.73a.5.5 0 0 0 0 .91l5.46 2.73a.5.5 0 0 1-.43.91l-5.46-2.73c-.13-.07-.29-.07-.43 0L3 16.32a.5.5 0 0 0 0 .91l9 4.5c.13.07.29.07.43 0l9-4.5a.5.5 0 0 0 0-.91L18.9 14.05c-.13-.07-.29-.07-.43 0l-5.46 2.73a.5.5 0 0 1-.43-.91l5.46-2.73a.5.5 0 0 0 0-.91l-5.46-2.73a.5.5 0 0 1 .43-.91l5.46 2.73c.13.07.29.07.43 0L21 10.68a.5.5 0 0 0 .43-.91z" style={styles.titleIcon}/>;
const RocketIcon = () => <Icon path="M4.5 11.5L3 13l-2-2L2 9.5l1.5-1.5 2 2L4.5 11.5z M13 3l-2 2-1.5-1.5L11 2l2-2 2 2-1.5 1.5L13 3z M7 14l-4 4 2.5 2.5 4-4L7 14z m9.5-2.5L15 13l2 2 1.5-1.5L20 12l-2-2-1.5 1.5z m-5 5L10 18l-4 4 4 4 4-4-2-2z" style={styles.titleIcon}/>;
const AwardIcon = () => <Icon path="M12 2L9 9l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1z" style={styles.titleIcon}/>;

// Safe text helper - ensures we never pass null/undefined to Text components
const SafeText = ({ children, style, ...props }) => {
  const safeContent = children == null ? '' : String(children);
  return <Text style={style} {...props}>{safeContent}</Text>;
};

// Safe link helper
const createLink = (url) => {
  if (!url || typeof url !== 'string') return '#';
  return url.startsWith('http') ? url : `https://${url}`;
};

const Section = ({ title, children, icon }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitle}>
      {icon}
      <SafeText style={styles.sectionTitleText}>{title}</SafeText>
    </View>
    {children}
  </View>
);

// --- THE MAIN DOCUMENT COMPONENT ---
export const ModernTemplatePDF = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data || {};

  return (
    <Document author={personalInfo.name || 'User'} title={`Resume - ${personalInfo.name || 'Resume'}`}>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <View style={styles.nameTitleWrapper}>
            {personalInfo.name && <SafeText style={styles.name}>{personalInfo.name}</SafeText>}
            {personalInfo.title && <SafeText style={styles.title}>{personalInfo.title}</SafeText>}
          </View>
          <View style={styles.contactInfo}>
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <MapPinIcon />
                <SafeText> {personalInfo.location}</SafeText>
              </View>
            )}
            {personalInfo.phone && (
              <Link src={`tel:${personalInfo.phone}`} style={[styles.contactItem, styles.link]}>
                <PhoneIcon />
                <SafeText> {personalInfo.phone}</SafeText>
              </Link>
            )}
            {personalInfo.email && (
              <Link src={`mailto:${personalInfo.email}`} style={[styles.contactItem, styles.link]}>
                <MailIcon />
                <SafeText> {personalInfo.email}</SafeText>
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link src={createLink(personalInfo.linkedin)} style={[styles.contactItem, styles.link]}>
                <LinkedinIcon />
                <SafeText> LinkedIn</SafeText>
              </Link>
            )}
            {personalInfo.github && (
              <Link src={createLink(personalInfo.github)} style={[styles.contactItem, styles.link]}>
                <GithubIcon />
                <SafeText> GitHub</SafeText>
              </Link>
            )}
            {personalInfo.portfolio && (
              <Link src={createLink(personalInfo.portfolio)} style={[styles.contactItem, styles.link]}>
                <GlobeIcon />
                <SafeText> Portfolio</SafeText>
              </Link>
            )}
          </View>
        </View>

        {summary && summary.trim() && (
          <Section title="Summary">
            <SafeText>{summary}</SafeText>
          </Section>
        )}
        
        {Array.isArray(experience) && experience.length > 0 && (
          <Section title="Experience" icon={<BriefcaseIcon />}>
            {experience.map(exp => (
              <View key={exp.id} style={styles.entry}>
                <SafeText style={styles.jobTitle}>{exp.jobTitle || 'Job Title'}</SafeText>
                <View style={styles.entryHeader}>
                  <SafeText>{exp.company || 'Company'}</SafeText>
                  <SafeText>
                    {(exp.startDate || '')} - {exp.endDate || 'Present'}
                    {exp.location && ` | ${exp.location}`}
                  </SafeText>
                </View>
                {exp.description && exp.description.trim() && 
                  exp.description.split('\n').filter(Boolean).map((item, i) => (
                    <View key={i} style={styles.descriptionItem}>
                      <SafeText style={styles.bullet}>• </SafeText>
                      <SafeText style={styles.itemContent}>{item.replace(/^- */, '')}</SafeText>
                    </View>
                  ))
                }
              </View>
            ))}
          </Section>
        )}

        {Array.isArray(projects) && projects.length > 0 && (
          <Section title="Projects" icon={<RocketIcon />}>
            {projects.map(proj => (
              <View key={proj.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <SafeText style={styles.jobTitle}>{proj.name || 'Project Name'}</SafeText>
                  {proj.link && proj.link.trim() && (
                    <Link src={createLink(proj.link)} style={styles.link}>
                      <SafeText>View Project</SafeText>
                    </Link>
                  )}
                </View>
                {proj.technologies && proj.technologies.trim() && (
                  <SafeText style={{fontSize: 9, color: '#6b7280', marginBottom: 4, fontWeight: 'bold'}}>
                    Technologies: {proj.technologies}
                  </SafeText>
                )}
                {proj.description && proj.description.trim() &&
                  proj.description.split('\n').filter(Boolean).map((item, i) => (
                    <View key={i} style={styles.descriptionItem}>
                      <SafeText style={styles.bullet}>• </SafeText>
                      <SafeText style={styles.itemContent}>{item.replace(/^- */, '')}</SafeText>
                    </View>
                  ))
                }
              </View>
            ))}
          </Section>
        )}

        {Array.isArray(education) && education.length > 0 && (
          <Section title="Education" icon={<GraduationCapIcon />}>
            {education.map(edu => (
              <View key={edu.id} style={styles.entry}>
                <SafeText style={styles.jobTitle}>{edu.degree || 'Degree'}</SafeText>
                <View style={styles.entryHeader}>
                  <SafeText>{edu.school || 'School'}</SafeText>
                  <SafeText>
                    {(edu.startDate || '')} - {(edu.endDate || '')}
                    {edu.location && ` | ${edu.location}`}
                  </SafeText>
                </View>
                {edu.description && edu.description.trim() && (
                  <SafeText style={{fontStyle: 'italic', fontSize: 9, marginTop: 4}}>
                    {edu.description}
                  </SafeText>
                )}
              </View>
            ))}
          </Section>
        )}
        
        {Array.isArray(skills) && skills.length > 0 && (
          <Section title="Skills">
            <View style={styles.skillsContainer}>
              {skills.filter(skill => skill && skill.trim()).map(skill => (
                <SafeText key={skill} style={styles.skill}>{skill}</SafeText>
              ))}
            </View>
          </Section>
        )}

        {Array.isArray(certifications) && certifications.length > 0 && (
          <Section title="Certifications" icon={<AwardIcon />}>
            {certifications.map(cert => (
              <View key={cert.id} style={styles.entry}>
                <SafeText style={styles.jobTitle}>{cert.name || 'Certification Name'}</SafeText>
                <View style={styles.entryHeader}>
                  <SafeText>{cert.issuingOrganization || ''}</SafeText>
                  {cert.dateIssued && cert.dateIssued.trim() && (
                    <SafeText>Issued: {cert.dateIssued}</SafeText>
                  )}
                </View>
              </View>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
};